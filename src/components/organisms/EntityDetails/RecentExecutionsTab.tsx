import {FC} from 'react';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {MetricsBarChart} from '@molecules';

import {ExecutionsTable} from '@organisms';

import {useEntityDetailsPick} from '@store/entityDetails';

interface RecentExecutionsTabProps {
  onRun: () => void;
  useAbortExecution: UseMutation<MutationDefinition<any, any, any, any, any>>;
}

const RecentExecutionsTab: FC<RecentExecutionsTabProps> = ({onRun, useAbortExecution}) => {
  const {metrics} = useEntityDetailsPick('metrics');
  return (
    <>
      <MetricsBarChart
        data={metrics?.executions}
        isDetailsView
        executionDurationP50ms={metrics?.executionDurationP50ms}
        executionDurationP95ms={metrics?.executionDurationP95ms}
      />
      <ExecutionsTable onRun={onRun} useAbortExecution={useAbortExecution} />
    </>
  );
};

export default RecentExecutionsTab;
