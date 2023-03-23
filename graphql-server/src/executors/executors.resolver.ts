import { ArgsType, Field, Int, Resolver, Query, Args, Subscription } from "@nestjs/graphql";
import { PubSub } from 'graphql-subscriptions';
import { Executor } from "./executors.model";
import {apiUrl} from '../config';

const pubSub = new PubSub();
let prevValueStr: string | null = null;
let prevValue: any = null;

async function tick() {
  const res = await fetch(`${apiUrl}/executors`);
  const text = await res.text();
  if (text !== prevValueStr) {
    prevValue = JSON.parse(text);
    await pubSub.publish('update', { executors: prevValue });
    prevValueStr = text;
  }

  setTimeout(tick, 200);
}

async function* updates() {
  yield { executors: prevValue };
  for await (const update of { [Symbol.asyncIterator]: () => pubSub.asyncIterator('update') }) {
    // @ts-ignore:
    yield { executors: update.executors };
  }
}

tick();

@Resolver(() => [Executor])
export class ExecutorsResolver {
  // constructor() {
  // }

  @Query(() => [Executor], {
    name: 'executors',
  })
  async getExecutors() {
    const res = await fetch(`${apiUrl}/executors`);
    const data = await res.json();
    return data;
  }

  @Subscription(() => [Executor], {
    name: 'executors',
  })
  subscribeToExecutors() {
    return updates();
  }
}
