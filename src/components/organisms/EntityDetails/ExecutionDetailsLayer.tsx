import React, {FC, PropsWithChildren, useContext, useEffect} from 'react';

import {useEntityDetailsConfig} from '@constants/entityDetailsConfig/useEntityDetailsConfig';

import {DashboardContext, MainContext} from '@contexts';

import {useLastCallback} from '@hooks/useLastCallback';

import {Entity} from '@models/entity';

import {notificationCall} from '@molecules';

import {initializeExecutionDetailsStore} from '@store/executionDetails';

import {isExecutionFinished} from '@utils/isExecutionFinished';
import {PollingIntervals} from '@utils/numbers';

export interface ExecutionDetailsLayerProps {
  entity: Entity;
  id: string;
  execId?: string;
}

const ExecutionDetailsLayer: FC<PropsWithChildren<ExecutionDetailsLayerProps>> = ({entity, id, execId, children}) => {
  const {useGetExecutionDetails} = useEntityDetailsConfig(entity);

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
    [execId]
  );

  const {isClusterAvailable} = useContext(MainContext);

  const {data} = pick('data');
  const {data: fetchedData, error} = useGetExecutionDetails(execId!, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable || !execId || (data?.id === execId && isExecutionFinished(data)),
  });
  sync({data: fetchedData?.id === execId ? fetchedData : null, error});

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
