import {useContext} from 'react';

import {Drawer} from 'antd';

import {ExecutionDetails} from '@molecules';

import useIsMobile from '@hooks/useIsMobile';

import {EntityDetailsContext} from '@contexts';

import {ExecutionDetailsDrawerWrapper} from './ExecutionDetailsDrawer.styled';

const ExecutionDetailsDrawer: React.FC = () => {
  const {isRowSelected, selectedRow, unselectRow} = useContext(EntityDetailsContext);

  const isMobile = useIsMobile();

  const drawerWidth = isMobile ? '100vw' : window.innerWidth * 0.85 < 1200 ? '85vw' : '1200px';

  return (
    <Drawer
      title={null}
      closable={false}
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
        {selectedRow ? <ExecutionDetails /> : null}
      </ExecutionDetailsDrawerWrapper>
    </Drawer>
  );
};

export default ExecutionDetailsDrawer;
