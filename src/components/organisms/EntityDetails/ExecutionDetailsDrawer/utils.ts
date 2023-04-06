import {Entity} from '@models/entity';
import {Execution} from '@models/execution';
import {TestSuiteExecution} from '@models/testSuiteExecution';

export const getHeaderValues = (entity: Entity, data: Execution | TestSuiteExecution | null) => {
  if (data) {
    if (entity === 'test-suites') {
      const targetData = data as TestSuiteExecution;
      const {startTime, endTime, duration, name, id} = targetData;

      return {name, number: 0, startedTime: new Date(startTime), finishedTime: new Date(endTime), duration, id};
    }

    if (entity === 'tests') {
      const targetData = data as Execution;
      const {name, number, startTime, endTime, duration, id} = targetData;

      return {name, number, startedTime: new Date(startTime), finishedTime: new Date(endTime), duration, id};
    }
  }

  return {name: '', number: 0, startedTime: new Date(), finishedTime: new Date(), duration: ''};
};
