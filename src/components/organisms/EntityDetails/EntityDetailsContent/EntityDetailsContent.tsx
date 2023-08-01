import {MutationDefinition} from '@reduxjs/toolkit/dist/query';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import useLoadingIndicator from '@hooks/useLoadingIndicator';

import {Entity} from '@models/entity';

import {RunningContextType, notificationCall} from '@molecules';

import {PageWrapper} from '@organisms';

import PageMetadata from '@pages/PageMetadata';

import {useRunTestSuiteMutation} from '@services/testSuites';
import {useRunTestMutation} from '@services/tests';

import {useEntityDetailsPick} from '@store/entityDetails';

import {useTelemetry} from '@telemetry';

import {displayDefaultNotificationFlow} from '@utils/notification';

import EntityDetailsContentHeader from './EntityDetailsContentHeader';
import EntityDetailsContentTabs from './EntityDetailsContentTabs';
import SummaryGrid from './SummaryGrid';

const EntityDetailsContent: React.FC = () => {
  const {entity, details, metrics} = useEntityDetailsPick('entity', 'details', 'metrics');
  const telemetry = useTelemetry();
  const {isLoading: isRunning, handleLoading: handleRunning} = useLoadingIndicator(2000);

  const [runTest] = useRunTestMutation();
  const [runTestSuite] = useRunTestSuiteMutation();

  const runRequestsMap: Record<Entity, MutationTrigger<MutationDefinition<any, any, any, void>>> = {
    'test-suites': runTestSuite,
    tests: runTest,
  };

  const name = details?.name;
  const namespace = details?.namespace;
  const description = details?.description;
  const type = details?.type;

  const onRunButtonClick = async () => {
    handleRunning();
    const runEntity = runRequestsMap[entity];

    return runEntity({
      id: name,
      data: {
        namespace,
        runningContext: {
          type: RunningContextType.userUI,
        },
      },
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        if (entity === 'tests') {
          telemetry.event('runTest', {type});
        } else {
          telemetry.event('runTestSuite');
        }
      })
      .catch(error => {
        notificationCall('failed', error.title, error.message);
      });
  };

  return (
    <PageWrapper>
      <PageMetadata title={name} description={description} />

      <EntityDetailsContentHeader onRun={onRunButtonClick} isRunning={isRunning} />
      <SummaryGrid metrics={metrics} />
      <EntityDetailsContentTabs onRun={onRunButtonClick} />
    </PageWrapper>
  );
};

export default EntityDetailsContent;
