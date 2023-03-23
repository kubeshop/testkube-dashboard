import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class ExecutorExecutorMeta {
  @Field({ nullable: true })
  iconURI: string;

  @Field({ nullable: true })
  docsURI: string;
}

@ObjectType()
class ExecutorExecutor {
  @Field({ nullable: true })
  executorType?: string;

  @Field({ nullable: true })
  image: string;

  @Field(() => [String], { nullable: true })
  types: string[];

  @Field(() => [String], { nullable: true })
  contentTypes: string[];

  @Field(() => [String], { nullable: true })
  features: string[];

  @Field(() => ExecutorExecutorMeta, { nullable: true })
  meta?: ExecutorExecutorMeta;
}

@ObjectType()
export class Executor {
  @Field()
  name: string;

  @Field(() => ExecutorExecutor)
  executor: ExecutorExecutor;
}
