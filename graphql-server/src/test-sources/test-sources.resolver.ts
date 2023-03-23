import { ArgsType, Field, Int, Resolver, Query, Args, Subscription } from "@nestjs/graphql";
import { PubSub } from 'graphql-subscriptions';
import { TestSource } from "./test-sources.model";
import {apiUrl} from '../config';

const pubSub = new PubSub();
let prevValueStr: string | null = null;
let prevValue: any = null;

async function tick() {
  const res = await fetch(`${apiUrl}/test-sources`);
  const text = await res.text();
  if (text !== prevValueStr) {
    prevValue = JSON.parse(text);
    await pubSub.publish('update', { testSources: prevValue });
    prevValueStr = text;
  }

  setTimeout(tick, 200);
}

async function* updates() {
  yield { testSources: prevValue };
  for await (const update of { [Symbol.asyncIterator]: () => pubSub.asyncIterator('update') }) {
    // @ts-ignore:
    yield { testSources: update.testSources };
  }
}

tick();

@Resolver(() => [TestSource])
export class TestSourcesResolver {
  // constructor() {
  // }

  @Query(() => [TestSource], {
    name: 'testSources',
  })
  async getTestSources() {
    const res = await fetch(`${apiUrl}/test-sources`);
    const data = await res.json();
    return data;
  }

  @Subscription(() => [TestSource], {
    name: 'testSources',
  })
  subscribeToTestSources() {
    return updates();
  }
}
