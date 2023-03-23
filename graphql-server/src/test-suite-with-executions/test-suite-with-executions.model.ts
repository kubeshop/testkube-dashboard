import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
class ExecutionItem {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  status: string;

  @Field()
  testName: string;

  @Field()
  type: string;
}

@ObjectType()
class TestSuiteStatusLatestExecution {
  @Field({ nullable: true })
  endTime?: string;

  @Field()
  id: string;

  @Field()
  startTime: string;

  @Field()
  status: string;

  @Field(() => [ExecutionItem], { nullable: true }) // FIXME?
  executions: ExecutionItem[];
}

@ObjectType()
class TestSuiteStatus {
  @Field(() => TestSuiteStatusLatestExecution, { nullable: true })
  latestExecution: TestSuiteStatusLatestExecution;
}

@ObjectType()
class TestSuiteStepExecute {
  @Field()
  name: string;

  @Field({ nullable: true })
  namespace: string;
}

@ObjectType()
class TestSuiteStep {
  @Field()
  stopTestOnFailure: boolean;

  @Field(() => TestSuiteStepExecute, { nullable: true })
  execute: TestSuiteStepExecute;
}

@ObjectType()
class TestSuite {
  @Field()
  created: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  name: string;

  @Field()
  namespace: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  labels?: Record<string, string>;

  @Field(() => TestSuiteStatus, { nullable: true })
  status: TestSuiteStatus;

  @Field(() => [TestSuiteStep])
  steps: TestSuiteStep[];
}

@ObjectType()
class LatestExecution {
  @Field({ nullable: true })
  duration?: string;

  @Field(() => Int, { nullable: true })
  durationMs?: number;

  @Field({ nullable: true })
  endTime?: string;

  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  startTime: string;

  @Field()
  status: string;

  @Field()
  testSuiteName: string;
}

@ObjectType()
class TestSuiteMetricsExecution {
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
class TestSuiteMetrics {
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

  @Field(() => [TestSuiteMetricsExecution], { nullable: true })
  executions: TestSuiteMetricsExecution[];
}

@ObjectType()
export class TestSuiteWithExecutionsModel {
  @Field(() => LatestExecution, { nullable: true })
  latestExecution?: LatestExecution;

  @Field(() => TestSuite)
  testSuite: TestSuite;

  @Field(() => TestSuiteMetrics)
  metrics: TestSuiteMetrics;
}
