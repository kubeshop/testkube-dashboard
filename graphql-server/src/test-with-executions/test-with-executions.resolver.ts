import { ArgsType, Field, Int, Resolver, Query, Args, Subscription } from "@nestjs/graphql";
import { PubSub } from 'graphql-subscriptions';
import { TestWithExecutionsModel } from "./test-with-executions.model";
import { GraphQLJSONObject } from "graphql-type-json";
import { AsyncIterator } from "@nestjs/apollo/dist/utils/async-iterator.util";
import {apiUrl} from '../config';

@ArgsType()
class PaginationArgs {
  @Field(() => Int)
  offset = 0;

  @Field(() => Int)
  limit = 20;
}

@ArgsType()
class TestsWithExecutionsFilter extends PaginationArgs {
  @Field(() => String)
  query = '';

  @Field(() => [String])
  statuses: string[] = [];

  @Field(() => [String])
  selectors: string[] = [];
}

const pubSub = new PubSub();
const metrics: any = {};
let prevValueStr: string | null = null;
let prevValue: any = [];

async function tick() {
  const res = await fetch(`${apiUrl}/test-with-executions?pageSize=10000&page=0`);
  const text = await res.text();
  if (text !== prevValueStr) {
    const nextValue = JSON.parse(text);

    // Download metrics
    const modifiedNames = nextValue
      .filter((x) => (JSON.stringify(x) !== JSON.stringify(prevValue.find((y) => y.test.name === x.test.name))))
      .map((x) => x.test.name);

    // TODO: Parallelize
    for (const name of modifiedNames) {
      const m = await fetch(`${apiUrl}/tests/${encodeURIComponent(name)}/metrics?last=7&limit=13`);
      const rest = await m.json();
      metrics[name] = {
        ...rest,
        failedExecutions: rest.failedExecutions || 0,
        totalExecutions: rest.totalExecutions || 0,
      };
    }

    // Include metrics
    for (const x of nextValue) {
      x.metrics = metrics[x.test.name];
    }

    prevValue = nextValue;
    await pubSub.publish('update', { testsWithExecutions: prevValue });
    prevValueStr = text;
  }

  setTimeout(tick, 200);
}

function prepare(list: any[], offset: number, limit: number, query: string, statuses: string[], selectors: Record<string, string>) {
  if (statuses.length > 0) {
    list = list.filter((x) => statuses.includes(x.latestExecution?.status));
  }
  if (query !== '') {
    list = list.filter((x) => x.test.name.includes(query));
  }
  list = list.filter((x) => Object.entries(selectors).every(([name, value]) => x.test.labels?.[name] === value));
  return list.slice(offset, offset + limit);
}

// TODO: Not send if there was no change in chunk
async function* updates(offset: number, limit: number, query: string, statuses: string[], selectors: Record<string, string>) {
  yield { testsWithExecutions: prepare(prevValue, offset, limit, query, statuses, selectors) };
  for await (const update of { [Symbol.asyncIterator]: () => pubSub.asyncIterator('update') }) {
    // @ts-ignore:
    yield { testsWithExecutions: prepare(update.testsWithExecutions, offset, limit, query, statuses, selectors) };
  }
}

tick();

export function withCancel<T>(asyncIterator: AsyncGenerator<T | undefined>): AsyncIterator<T | undefined> {
  if (!asyncIterator.return) {
    asyncIterator.return = () => Promise.resolve({ value: undefined, done: true });
  }

  let ended = false;

  const savedNext = asyncIterator.next.bind(asyncIterator);
  asyncIterator.next = async (...args: any) => {
    const result = await savedNext(...args);
    return ended ? { value: undefined, done: true } : result;
  };

  const savedReturn = asyncIterator.return.bind(asyncIterator);
  asyncIterator.return = () => {
    ended = true;
    return savedReturn();
  };

  return asyncIterator as any;
}

@Resolver(() => [TestWithExecutionsModel])
export class TestsWithExecutionsResolver {
  // constructor() {
  // }

  // TODO: Add filtering
  @Query(() => [TestWithExecutionsModel], {
    name: 'testsWithExecutions',
  })
  async getTestsWithExecutions(@Args() args: PaginationArgs) {
    const res = await fetch(`${apiUrl}/test-with-executions?pageSize=${args.limit}&page=${Math.floor(args.offset / args.limit)}`);
    const data = await res.json();
    return data;
  }

  // TODO: Add metrics timeframe
  // TODO: Handle textSearch
  @Subscription(() => [TestWithExecutionsModel], {
    name: 'testsWithExecutions',
  })
  subscribeToTestsWithExecutions(@Args() args: TestsWithExecutionsFilter) {
    if (args.selectors.some((x) => !/^[^=]+=./.test(x))) {
      throw new Error('Invalid selector');
    }

    const selectors = {};
    for (const selector of args.selectors) {
      const [, name, value] = selector.match(/^([^=]+)=(.+)$/);
      selectors[name] = value;
    }
    return withCancel(updates(args.offset, args.limit, args.query, args.statuses, selectors));
  }
}
