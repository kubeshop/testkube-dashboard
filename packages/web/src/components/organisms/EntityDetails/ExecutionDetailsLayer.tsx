import React, {FC, PropsWithChildren, useEffect, useMemo} from 'react';

import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {QueryDefinition} from '@reduxjs/toolkit/query';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {useLastCallback} from '@hooks/useLastCallback';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Entity} from '@models/entity';

import {notificationCall} from '@molecules';

import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick, useExecutionDetailsReset, useExecutionDetailsSync} from '@store/executionDetails';

import {isExecutionFinished} from '@utils/isExecutionFinished';
import {PollingIntervals} from '@utils/numbers';
import {convertTestSuiteV2ExecutionToV3, isTestSuiteV2Execution} from '@utils/testSuites';

export interface ExecutionDetailsLayerProps {
  entity: Entity;
  id: string;
  execId?: string;
  useGetExecutionDetails: UseQuery<QueryDefinition<any, any, any, any, any>>;
}

const ExecutionDetailsLayer: FC<PropsWithChildren<ExecutionDetailsLayerProps>> = ({
  entity,
  id,
  execId,
  useGetExecutionDetails,
  children,
}) => {
  const {executions} = useEntityDetailsPick('executions');
  const open = useDashboardNavigate((targetId: string) => `/${entity}/${id}/executions/${targetId}`);
  useExecutionDetailsReset(
    {
      id: execId,
      open,
      openByName: useLastCallback((name: string) => {
        const targetRecord = executions.results?.find((item: any) => item.name === name);
        if (targetRecord) {
          open(targetRecord.id);
        }
      }),
      close: useDashboardNavigate(`/${entity}/${id}`),
    },
    [execId, useGetExecutionDetails]
  );

  const isClusterAvailable = useSystemAccess(SystemAccess.system);

  const {data} = useExecutionDetailsPick('data');
  const {data: rawFetchedData, error} = useGetExecutionDetails(execId!, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable || !execId || (data?.id === execId && isExecutionFinished(data)),
    refetchOnMountOrArgChange: true,
  });
  const fetchedData = rawFetchedData?.id === execId ? rawFetchedData : null;
  const isV2 = isTestSuiteV2Execution(fetchedData);
  const result = useMemo(() => (isV2 ? convertTestSuiteV2ExecutionToV3(fetchedData) : fetchedData), [fetchedData]);
  useExecutionDetailsSync({data: result, error});

  useEffect(() => {
    if (error) {
      const title = error?.data?.title;
      const detail = error?.data?.detail;

      if (title && detail) {
        notificationCall('failed', title, detail, 0);
      } else {
        notificationCall('failed', 'Unknown error', 'Something went wrong', 0);
      }
    }
  }, [error]);

  return <>{children}</>;
};

export default ExecutionDetailsLayer;
