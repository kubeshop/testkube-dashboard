import { Module } from '@nestjs/common';
import { ExecutorsResolver } from "./executors.resolver";

@Module({
  providers: [ ExecutorsResolver],
})
export class ExecutorsModule {}
