import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
class TestStatusLatestExecution {
  @Field({ nullable: true })
  endTime?: string;

  @Field()
  id: string;

  @Field()
  startTime: string;

  @Field()
  status: string;

  @Field(() => Int)
  number: number;
}

@ObjectType()
class TestStatus {
  @Field(() => TestStatusLatestExecution, { nullable: true })
  latestExecution: TestStatusLatestExecution;
}

@ObjectType()
class Test {
  @Field()
  created: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  name: string;

  @Field()
  namespace: string;

  @Field()
  type: string;

  @Field(() => GraphQLJSONObject)
  content: Record<string, any>;

  @Field(() => GraphQLJSONObject, { nullable: true })
  labels?: Record<string, string>;

  @Field(() => TestStatus, { nullable: true })
  status: TestStatus;
}

@ObjectType()
class TestLatestExecution {
  @Field({ nullable: true })
  duration?: string;

  @Field(() => Int, { nullable: true })
  durationMs?: number;

  @Field({ nullable: true })
  endTime?: string;

  @Field()
  id: string;

  @Field(() => Int)
  number: number;

  @Field()
  startTime: string;

  @Field()
  status: string;

  @Field()
  name: string;

  @Field()
  testName: string;

  @Field()
  testType: string;
}

@ObjectType()
class TestMetricsExecution {
  @Field({ nullable: true })
  duration?: string;

  @Field(() => Int, { nullable: true })
  durationMs?: number;

  @Field()
  name: string;

  @Field()
  startTime: string;

  @Field()
  status: string;
}

@ObjectType()
class TestMetrics {
  @Field()
  executionDurationP50: string;

  @Field(() => Int, { nullable: true })
  executionDurationP50ms?: number;

  @Field()
  executionDurationP90: string;

  @Field(() => Int, { nullable: true })
  executionDurationP90ms?: number;

  @Field()
  executionDurationP95: string;

  @Field(() => Int, { nullable: true })
  executionDurationP95ms: number;

  @Field()
  executionDurationP99: string;

  @Field(() => Int, { nullable: true })
  executionDurationP99ms: number;

  @Field(() => Float, { nullable: true })
  passFailRatio: number;

  @Field(() => Int)
  failedExecutions: number;

  @Field(() => Int)
  totalExecutions: number;

  @Field(() => [TestMetricsExecution], { nullable: true })
  executions: TestMetricsExecution[];
}

@ObjectType()
export class TestWithExecutionsModel {
  @Field(() => TestLatestExecution, { nullable: true })
  latestExecution?: TestLatestExecution;

  @Field(() => Test)
  test: Test;

  @Field(() => TestMetrics)
  metrics: TestMetrics;
}
