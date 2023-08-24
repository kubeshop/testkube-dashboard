import {FC, PropsWithChildren, ReactElement} from 'react';

import {LoadingOutlined} from '@ant-design/icons';

import {useIsMobile} from '@hooks/useIsMobile';

import {useLogOutputPick} from '@store/logOutput';

import {ExecutionDrawerWrapper, StyledDrawer} from './ExecutionDrawer.styled';

const headerStyle = {borderBottom: 0, padding: '40px 30px 0'};
const loaderBodyStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '48px',
};

interface ExecutionDrawerProps {
  header: ReactElement;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
}

export const ExecutionDrawer: FC<PropsWithChildren<ExecutionDrawerProps>> = ({
  header,
  open,
  loading,
  onClose,
  children,
}) => {
  const {isFullscreen: isFullscreenLogOutput} = useLogOutputPick('isFullscreen');
  const isMobile = useIsMobile();

  const drawerWidth = isMobile ? '100vw' : window.innerWidth * 0.85 < 1200 ? '85vw' : '1200px';

  if (!open) {
    return (
      <StyledDrawer
        $down={isFullscreenLogOutput}
        bodyStyle={loaderBodyStyle}
        headerStyle={headerStyle}
        closable={false}
        width={drawerWidth}
      />
    );
  }

  if (loading) {
    return (
      <StyledDrawer
        $down={isFullscreenLogOutput}
        bodyStyle={loaderBodyStyle}
        headerStyle={headerStyle}
        closable={false}
        width={drawerWidth}
        onClose={onClose}
        open
      >
        <LoadingOutlined />
      </StyledDrawer>
    );
  }

  return (
    <StyledDrawer
      $down={isFullscreenLogOutput}
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
      <ExecutionDrawerWrapper transition={{type: 'just'}} drawerWidth={drawerWidth} $isRowSelected>
        {children}
      </ExecutionDrawerWrapper>
    </StyledDrawer>
  );
};
