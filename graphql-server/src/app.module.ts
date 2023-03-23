import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestSuiteWithExecutionsModule } from './test-suite-with-executions/test-suite-with-executions.module';
import { ExecutorsModule } from './executors/executors.module';
import { TestSourcesModule } from './test-sources/test-sources.module';
import { TestWithExecutionsModule } from './test-with-executions/test-with-executions.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      include: [TestSuiteWithExecutionsModule, ExecutorsModule, TestSourcesModule, TestWithExecutionsModule],
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    TestSuiteWithExecutionsModule,
    ExecutorsModule,
    TestSourcesModule,
    TestWithExecutionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
