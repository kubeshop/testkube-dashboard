import React, {useContext, useEffect, useState} from 'react';

import {Drawer} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

import {Entity} from '@models/entity';

import {TestExecutionDetailsTabs, TestSuiteExecutionDetailsTabs, notificationCall} from '@molecules';

import useIsMobile from '@hooks/useIsMobile';

import {PollingIntervals} from '@utils/numbers';

import {useGetTestSuiteExecutionByIdQuery} from '@services/testSuiteExecutions';
import {useGetTestExecutionByIdQuery} from '@services/tests';

import Colors from '@styles/Colors';

import {EntityDetailsContext, ExecutionDetailsContext, MainContext} from '@contexts';
import {ExecutionDetailsOnDataChangeInterface} from '@contexts/ExecutionDetailsContext';

import {ExecutionDetailsDrawerWrapper} from './ExecutionDetailsDrawer.styled';
import ExecutionDetailsDrawerHeader from './ExecutionDetailsDrawerHeader';

const TestSuiteExecutionDetailsDataLayer: React.FC = () => {
  const {onDataChange} = useContext(ExecutionDetailsContext);
  const {execId} = useContext(EntityDetailsContext);
  const {isClusterAvailable} = useContext(MainContext);

  // @ts-ignore
  // we have checked if execId exists on <ExecutionDetails /> below
  const {data, isLoading, isFetching, refetch, error} = useGetTestSuiteExecutionByIdQuery(execId, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch, error});
  }, [data, isLoading, isFetching, error]);

  return <></>;
};

const TestExecutionDetailsDataLayer: React.FC = () => {
  const {onDataChange} = useContext(ExecutionDetailsContext);
  const {execId} = useContext(EntityDetailsContext);
  const {isClusterAvailable} = useContext(MainContext);

  // @ts-ignore
  // we have checked if execId exists on <ExecutionDetails /> below
  const {data, isLoading, isFetching, refetch, error} = useGetTestExecutionByIdQuery(execId, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch, error});
  }, [data, isLoading, isFetching, error]);

  return <></>;
};

const dataLayers: {[key in Entity]: any} = {
  'test-suites': <TestSuiteExecutionDetailsDataLayer />,
  tests: <TestExecutionDetailsDataLayer />,
};

const components: {[key in Entity]: any} = {
  'test-suites': <TestSuiteExecutionDetailsTabs />,
  tests: <TestExecutionDetailsTabs />,
};

const headerStyle = {borderBottom: 0, padding: '40px 30px 0', backgroundColor: Colors.slate800};
const loaderBodyStyle = {display: 'flex', alignItems: 'center', justifyContent: 'center', background: Colors.slate800, fontSize: '48px'};

const ExecutionDetailsDrawer: React.FC = () => {
  const {isRowSelected, selectedRow, unselectRow, entity, execId} = useContext(EntityDetailsContext);

  const isMobile = useIsMobile();

  const drawerWidth = isMobile ? '100vw' : window.innerWidth * 0.85 < 1200 ? '85vw' : '1200px';

  const [infoPanelProps, setInfoPanelProps] = useState<ExecutionDetailsOnDataChangeInterface>({
    data: null,
    isLoading: false,
    isFetching: false,
    refetch: () => {},
    error: null,
  });

  const [error, setError] = useState<any>(null);

  const {data} = infoPanelProps;

  const onDataChange = (args: ExecutionDetailsOnDataChangeInterface) => {
    if (JSON.stringify(error) !== JSON.stringify(args.error)) {
      setError(args.error);
    }
    setInfoPanelProps(args);
  };

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

  if (!execId) {
    return <></>;
  }

  return (
    <ExecutionDetailsContext.Provider value={{onDataChange, data}}>
      {dataLayers[entity]}
      {data ? (
        <Drawer
          title={<ExecutionDetailsDrawerHeader data={data} />}
          headerStyle={headerStyle}
          closable={false}
          mask
          maskClosable
          placement="right"
          open={isRowSelected}
          width={drawerWidth}
          onClose={unselectRow}
        >
          <ExecutionDetailsDrawerWrapper
            $isRowSelected={isRowSelected}
            transition={{type: 'just'}}
            drawerWidth={drawerWidth}
          >
            {selectedRow ? components[entity] : null}
          </ExecutionDetailsDrawerWrapper>
        </Drawer>
      ) : (
        <Drawer
          bodyStyle={loaderBodyStyle}
          headerStyle={headerStyle}
          closable={false}
          open={isRowSelected}
          width={drawerWidth}
          onClose={unselectRow}
        >
          <LoadingOutlined />
        </Drawer>
      )}
    </ExecutionDetailsContext.Provider>
  );
};

export default ExecutionDetailsDrawer;
