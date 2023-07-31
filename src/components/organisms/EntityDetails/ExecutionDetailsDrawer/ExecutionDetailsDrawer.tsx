import React, {useContext, useEffect} from 'react';

import {LoadingOutlined} from '@ant-design/icons';
import {Drawer} from 'antd';

import {useEntityDetailsConfig} from '@constants/entityDetailsConfig/useEntityDetailsConfig';

import {MainContext} from '@contexts';

import useIsMobile from '@hooks/useIsMobile';

import {Entity} from '@models/entity';
import {Execution} from '@models/execution';
import {TestSuiteExecution} from '@models/testSuiteExecution';

import {TestExecutionDetailsTabs, TestSuiteExecutionDetailsTabs, notificationCall} from '@molecules';

import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick, useExecutionDetailsSync} from '@store/executionDetails';

import {PollingIntervals} from '@utils/numbers';

import {ExecutionDetailsDrawerWrapper} from './ExecutionDetailsDrawer.styled';
import ExecutionDetailsDrawerHeader from './ExecutionDetailsDrawerHeader';

const components: Record<Entity, JSX.Element> = {
  'test-suites': <TestSuiteExecutionDetailsTabs />,
  tests: <TestExecutionDetailsTabs />,
};

const headerStyle = {borderBottom: 0, padding: '40px 30px 0'};
const loaderBodyStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '48px',
};

const ExecutionDetailsDrawer: React.FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {entity} = useEntityDetailsPick('entity');
  const {close, id, data: currentData} = useExecutionDetailsPick('close', 'id', 'data');
  const currentStatus =
    (currentData as Execution)?.executionResult?.status || (currentData as TestSuiteExecution)?.status;

  const {useGetExecutionDetails} = useEntityDetailsConfig(entity);
  const {data, error} = useGetExecutionDetails(id!, {
    pollingInterval: PollingIntervals.everySecond,
    skip:
      !isClusterAvailable ||
      !id ||
      (id === currentData?.id && currentStatus && !['queued', 'pending', 'running'].includes(currentStatus)),
  });
  useExecutionDetailsSync({data: id === data?.id ? data : null, error});

  const isMobile = useIsMobile();

  const drawerWidth = isMobile ? '100vw' : window.innerWidth * 0.85 < 1200 ? '85vw' : '1200px';

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

  if (!id) {
    return (
      <Drawer
        bodyStyle={loaderBodyStyle}
        headerStyle={headerStyle}
        closable={false}
        open={false}
        width={drawerWidth}
        onClose={close}
      />
    );
  }

  if (!currentData) {
    return (
      <Drawer
        bodyStyle={loaderBodyStyle}
        headerStyle={headerStyle}
        closable={false}
        open={Boolean(id)}
        width={drawerWidth}
        onClose={close}
      >
        <LoadingOutlined />
      </Drawer>
    );
  }

  return (
    <Drawer
      title={<ExecutionDetailsDrawerHeader data={currentData} />}
      headerStyle={headerStyle}
      closable={false}
      mask
      maskClosable
      placement="right"
      open={Boolean(id)}
      width={drawerWidth}
      onClose={close}
    >
      <ExecutionDetailsDrawerWrapper $isRowSelected={Boolean(id)} transition={{type: 'just'}} drawerWidth={drawerWidth}>
        {id ? components[entity] : null}
      </ExecutionDetailsDrawerWrapper>
    </Drawer>
  );
};

export default ExecutionDetailsDrawer;
