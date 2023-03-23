import { Module } from '@nestjs/common';
import { TestSourcesResolver } from "./test-sources.resolver";

@Module({
  providers: [TestSourcesResolver]
})
export class TestSourcesModule {}
