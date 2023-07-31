import React, {useContext, useEffect} from 'react';

import {LoadingOutlined} from '@ant-design/icons';
import {Drawer} from 'antd';

import {useEntityDetailsConfig} from '@constants/entityDetailsConfig/useEntityDetailsConfig';

import {MainContext} from '@contexts';

import useIsMobile from '@hooks/useIsMobile';

import {Entity} from '@models/entity';

import {TestExecutionDetailsTabs, TestSuiteExecutionDetailsTabs, notificationCall} from '@molecules';

import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick, useExecutionDetailsSync} from '@store/executionDetails';

import {isExecutionFinished} from '@utils/isExecutionFinished';
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
  const {close, id, data} = useExecutionDetailsPick('close', 'id', 'data');

  const {useGetExecutionDetails} = useEntityDetailsConfig(entity);
  const {data: fetchedData, error} = useGetExecutionDetails(id!, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable || !id || isExecutionFinished(data),
  });
  useExecutionDetailsSync({data: fetchedData?.id === id ? fetchedData : null, error});

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
    return <Drawer bodyStyle={loaderBodyStyle} headerStyle={headerStyle} closable={false} width={drawerWidth} />;
  }

  if (!data) {
    return (
      <Drawer
        bodyStyle={loaderBodyStyle}
        headerStyle={headerStyle}
        closable={false}
        width={drawerWidth}
        onClose={close}
        open
      >
        <LoadingOutlined />
      </Drawer>
    );
  }

  return (
    <Drawer
      title={<ExecutionDetailsDrawerHeader data={fetchedData} />}
      headerStyle={headerStyle}
      closable={false}
      mask
      maskClosable
      placement="right"
      width={drawerWidth}
      open
      onClose={close}
    >
      <ExecutionDetailsDrawerWrapper transition={{type: 'just'}} drawerWidth={drawerWidth} $isRowSelected>
        {components[entity]}
      </ExecutionDetailsDrawerWrapper>
    </Drawer>
  );
};

export default ExecutionDetailsDrawer;
