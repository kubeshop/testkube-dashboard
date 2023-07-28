import React, {useContext, useEffect} from 'react';
import {usePrevious} from 'react-use';

import {LoadingOutlined} from '@ant-design/icons';
import {Drawer} from 'antd';

import {useEntityDetailsConfig} from '@constants/entityDetailsConfig/useEntityDetailsConfig';

import {MainContext} from '@contexts';

import useIsMobile from '@hooks/useIsMobile';

import {Entity} from '@models/entity';

import {TestExecutionDetailsTabs, TestSuiteExecutionDetailsTabs, notificationCall} from '@molecules';

import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsSync} from '@store/executionDetails';

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
  const {closeExecutionDetails, entity, execId} = useEntityDetailsPick('closeExecutionDetails', 'entity', 'execId');

  const {useGetExecutionDetails} = useEntityDetailsConfig(entity);
  const {data, error} = useGetExecutionDetails(execId!, {
    pollingInterval: PollingIntervals.everySecond,
    skip: !isClusterAvailable || !execId, // TODO: Skip when the execution is already loaded and finished
  });
  const changed = useExecutionDetailsSync({data, error});
  const prevData = usePrevious(data);

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

  if (!execId) {
    return null;
  }

  if (!data || (changed && !prevData)) {
    return (
      <Drawer
        bodyStyle={loaderBodyStyle}
        headerStyle={headerStyle}
        closable={false}
        open={Boolean(execId)}
        width={drawerWidth}
        onClose={closeExecutionDetails}
      >
        <LoadingOutlined />
      </Drawer>
    );
  }

  return (
    <Drawer
      title={<ExecutionDetailsDrawerHeader data={data} />}
      headerStyle={headerStyle}
      closable={false}
      mask
      maskClosable
      placement="right"
      open={Boolean(execId)}
      width={drawerWidth}
      onClose={closeExecutionDetails}
    >
      <ExecutionDetailsDrawerWrapper
        $isRowSelected={Boolean(execId)}
        transition={{type: 'just'}}
        drawerWidth={drawerWidth}
      >
        {execId ? components[entity] : null}
      </ExecutionDetailsDrawerWrapper>
    </Drawer>
  );
};

export default ExecutionDetailsDrawer;
