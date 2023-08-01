import {FC, PropsWithChildren, ReactElement} from 'react';

import {LoadingOutlined} from '@ant-design/icons';
import {Drawer} from 'antd';

import useIsMobile from '@hooks/useIsMobile';

import {ExecutionDetailsDrawerWrapper} from './ExecutionDetailsDrawer.styled';

const headerStyle = {borderBottom: 0, padding: '40px 30px 0'};
const loaderBodyStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '48px',
};

interface ExecutionDetailsDrawerProps {
  header: ReactElement;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
}

const ExecutionDetailsDrawer: FC<PropsWithChildren<ExecutionDetailsDrawerProps>> = ({
  header,
  open,
  loading,
  onClose,
  children,
}) => {
  const isMobile = useIsMobile();

  const drawerWidth = isMobile ? '100vw' : window.innerWidth * 0.85 < 1200 ? '85vw' : '1200px';

  if (!open) {
    return <Drawer bodyStyle={loaderBodyStyle} headerStyle={headerStyle} closable={false} width={drawerWidth} />;
  }

  if (loading) {
    return (
      <Drawer
        bodyStyle={loaderBodyStyle}
        headerStyle={headerStyle}
        closable={false}
        width={drawerWidth}
        onClose={onClose}
        open
      >
        <LoadingOutlined />
      </Drawer>
    );
  }

  return (
    <Drawer
      title={header}
      headerStyle={headerStyle}
      closable={false}
      mask
      maskClosable
      placement="right"
      width={drawerWidth}
      open
      onClose={onClose}
    >
      <ExecutionDetailsDrawerWrapper transition={{type: 'just'}} drawerWidth={drawerWidth} $isRowSelected>
        {children}
      </ExecutionDetailsDrawerWrapper>
    </Drawer>
  );
};

export default ExecutionDetailsDrawer;
