import { Module } from '@nestjs/common';
import { TestsWithExecutionsResolver } from "./test-with-executions.resolver";

@Module({
  providers: [TestsWithExecutionsResolver]
})
export class TestWithExecutionsModule {}
