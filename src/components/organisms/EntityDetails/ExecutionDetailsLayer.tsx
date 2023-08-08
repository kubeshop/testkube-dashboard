import React, {FC, PropsWithChildren, useContext, useEffect, useMemo} from 'react';

import {UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {QueryDefinition} from '@reduxjs/toolkit/query';

import {DashboardContext, MainContext} from '@contexts';

import {useLastCallback} from '@hooks/useLastCallback';

import {Entity} from '@models/entity';

import {notificationCall} from '@molecules';

import {initializeExecutionDetailsStore} from '@store/executionDetails';

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
  const {navigate} = useContext(DashboardContext);

  const [ExecutionStoreProvider, {pick, sync}] = initializeExecutionDetailsStore(
    {
      id: execId,
      open: useLastCallback((targetId: string) => {
        navigate(`/${entity}/${id}/executions/${targetId}`);
      }),
      close: useLastCallback(() => {
        navigate(`/${entity}/${id}`);
      }),
    },
    [execId, useGetExecutionDetails]
  );

  const {isClusterAvailable} = useContext(MainContext);

  const {data} = pick('data');
  const {data: rawFetchedData, error} = useGetExecutionDetails(execId!, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable || !execId || (data?.id === execId && isExecutionFinished(data)),
  });
  const fetchedData = rawFetchedData?.id === execId ? rawFetchedData : null;
  const isV2 = isTestSuiteV2Execution(fetchedData);
  const result = useMemo(() => (isV2 ? convertTestSuiteV2ExecutionToV3(fetchedData) : fetchedData), [fetchedData]);
  sync({data: result, error});

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

  return <ExecutionStoreProvider>{children}</ExecutionStoreProvider>;
};

export default ExecutionDetailsLayer;
