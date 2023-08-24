import {Drawer} from 'antd';

import {motion} from 'framer-motion';
import styled from 'styled-components';

export const StyledDrawer = styled(Drawer)<{$down?: boolean}>`
  ${({$down}) => ($down ? 'z-index: 998' : '')}
`;

export const ExecutionDrawerWrapper = styled(motion.div)<{
  $isRowSelected: boolean;
  drawerWidth: string;
}>`
  position: relative;

  display: flex;
  flex-direction: column;

  height: 100%;
  width: ${props => (props.drawerWidth ? `${props.drawerWidth}` : '85vw')};

  margin: 0;
  padding: ${({$isRowSelected}) => ($isRowSelected ? '30px' : '0')};

  .ant-tabs,
  .ant-tabs-tabpane {
    height: 100%;
  }

  .ant-tabs-content-holder {
    height: 100%;
    overflow: auto;
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
`;

export const ItemRow = styled.div<{$flex: number}>`
  display: flex;
  align-items: center;
  flex: ${({$flex}) => $flex};
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const ItemColumn = styled.div`
  overflow: hidden;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;

  flex: 1;

  &.flex-auto {
    flex: 0 1 auto;
  }
`;

export const HeaderContent = styled.div`
  overflow: hidden;

  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;

  margin-left: 15px;

  width: 0;
`;
