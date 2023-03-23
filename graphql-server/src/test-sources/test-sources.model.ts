import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class TestSourceRepository {
  @Field()
  type: string;

  @Field()
  uri: string;
}

@ObjectType()
export class TestSource {
  @Field()
  name: string;

  @Field()
  namespace: string;

  @Field(() => TestSourceRepository)
  repository: TestSourceRepository;
}
