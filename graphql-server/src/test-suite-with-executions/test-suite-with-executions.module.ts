import { Module } from '@nestjs/common';
import { TestSuitesWithExecutionsResolver } from "./test-suite-with-executions.resolver";

@Module({
  providers: [TestSuitesWithExecutionsResolver],
})
export class TestSuiteWithExecutionsModule {}
