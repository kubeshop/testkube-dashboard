import React from 'react';

import {LoadingOutlined} from '@ant-design/icons';
import {Drawer} from 'antd';

import useIsMobile from '@hooks/useIsMobile';

import {Entity} from '@models/entity';

import {TestExecutionDetailsTabs, TestSuiteExecutionDetailsTabs} from '@molecules';

import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutionDetailsPick} from '@store/executionDetails';

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
  const {entity} = useEntityDetailsPick('entity');
  const {close, id, data} = useExecutionDetailsPick('close', 'id', 'data', 'error');

  const isMobile = useIsMobile();

  const drawerWidth = isMobile ? '100vw' : window.innerWidth * 0.85 < 1200 ? '85vw' : '1200px';

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
      title={<ExecutionDetailsDrawerHeader data={data} />}
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
