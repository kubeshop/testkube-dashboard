import {useCallback} from 'react';

import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import useLoadingIndicator from '@hooks/useLoadingIndicator';

import {Entity} from '@models/entity';

import {RunningContextType, notificationCall} from '@molecules';

import {useRunTestSuiteMutation} from '@services/testSuites';
import {useRunTestMutation} from '@services/tests';

import {useTelemetry} from '@telemetry';

import {displayDefaultNotificationFlow} from '@utils/notification';

const useRunEntity = (
  entity: Entity,
  details?: {name: string; type?: string; namespace?: string}
): [boolean, () => Promise<any>] => {
  const telemetry = useTelemetry();
  const {isLoading, handleLoading} = useLoadingIndicator(2000);

  const [runTest] = useRunTestMutation();
  const [runTestSuite] = useRunTestSuiteMutation();
  const runRequestsMap: Record<Entity, MutationTrigger<MutationDefinition<any, any, any, void>>> = {
    'test-suites': runTestSuite,
    tests: runTest,
  };
  const runEntity = runRequestsMap[entity];

  const trigger = useCallback(async () => {
    if (!details || isLoading) {
      return;
    }

    handleLoading();

    return runEntity({
      id: details!.name,
      data: {
        namespace: details!.namespace,
        runningContext: {
          type: RunningContextType.userUI,
        },
      },
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        if (entity === 'tests') {
          telemetry.event('runTest', {type: details!.type});
        } else {
          telemetry.event('runTestSuite');
        }
      })
      .catch(error => {
        notificationCall('failed', error.title, error.message);
      });
  }, [runEntity, details?.name, details?.namespace, details?.type]);

  return [isLoading, trigger];
};

export default useRunEntity;
