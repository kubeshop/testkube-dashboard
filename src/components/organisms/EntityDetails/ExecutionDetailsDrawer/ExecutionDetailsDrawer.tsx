import {useContext, useEffect, useState} from 'react';

import {Drawer} from 'antd';

import {Entity} from '@models/entity';

import {TestExecutionDetailsTabs, TestSuiteExecutionDetailsTabs} from '@molecules';

import useIsMobile from '@hooks/useIsMobile';

import {PollingIntervals} from '@utils/numbers';

import {useGetTestSuiteExecutionByIdQuery} from '@services/testSuiteExecutions';
import {useGetTestExecutionByIdQuery} from '@services/tests';

import Colors from '@styles/Colors';

import {EntityDetailsContext, ExecutionDetailsContext} from '@contexts';
import {ExecutionDetailsOnDataChangeInterface} from '@contexts/ExecutionDetailsContext';

import {ExecutionDetailsDrawerWrapper} from './ExecutionDetailsDrawer.styled';
import ExecutionDetailsDrawerHeader from './ExecutionDetailsDrawerHeader';

const TestSuiteExecutionDetailsDataLayer: React.FC = () => {
  const {onDataChange} = useContext(ExecutionDetailsContext);
  const {execId} = useContext(EntityDetailsContext);

  // @ts-ignore
  // we have checked if execId exists on <ExecutionDetails /> below
  const {data, isLoading, isFetching, refetch} = useGetTestSuiteExecutionByIdQuery(execId, {
    pollingInterval: PollingIntervals.everySecond,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const TestExecutionDetailsDataLayer: React.FC = () => {
  const {onDataChange} = useContext(ExecutionDetailsContext);
  const {execId} = useContext(EntityDetailsContext);

  // @ts-ignore
  // we have checked if execId exists on <ExecutionDetails /> below
  const {data, isLoading, isFetching, refetch} = useGetTestExecutionByIdQuery(execId, {
    pollingInterval: PollingIntervals.everySecond,
  });

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

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

const ExecutionDetailsDrawer: React.FC = () => {
  const {isRowSelected, selectedRow, unselectRow, entity, execId} = useContext(EntityDetailsContext);

  const isMobile = useIsMobile();

  const drawerWidth = isMobile ? '100vw' : window.innerWidth * 0.85 < 1200 ? '85vw' : '1200px';

  const [infoPanelProps, setInfoPanelProps] = useState<ExecutionDetailsOnDataChangeInterface>({
    data: null,
    isLoading: false,
    isFetching: false,
    refetch: () => {},
  });

  const {data} = infoPanelProps;

  const onDataChange = (args: ExecutionDetailsOnDataChangeInterface) => {
    setInfoPanelProps(args);
  };

  if (!execId) {
    return <></>;
  }

  return (
    <ExecutionDetailsContext.Provider value={{onDataChange, data}}>
      {dataLayers[entity]}
      {data ? (
        <Drawer
          title={<ExecutionDetailsDrawerHeader data={data} />}
          headerStyle={{borderBottom: 0, padding: '40px 30px 0', backgroundColor: Colors.slate800}}
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
      ) : null}
    </ExecutionDetailsContext.Provider>
  );
};

export default ExecutionDetailsDrawer;
