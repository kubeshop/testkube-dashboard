import {motion} from 'framer-motion';
import styled from 'styled-components';

import Colors from '@styles/Colors';

export const getInfoPanelFlexProperty = (conditions: any) => {
  const {$isRowSelected} = conditions;

  if ($isRowSelected) {
    return '0 0 40%';
  }

  return '0 0 0';
};

export const ExecutionDetailsDrawerWrapper = styled(motion.div)<{$isRowSelected: boolean; drawerWidth: string}>`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  // flex: ${props => getInfoPanelFlexProperty(props)};

  height: 100%;
  width: ${props => (props.drawerWidth ? `${props.drawerWidth}` : '85vw')}

  margin: 0;
  padding: ${({$isRowSelected}) => ($isRowSelected ? '45px 30px' : '0')};

  background: ${Colors.slate800};

  transition: 0.3s flex;
`;

export const DrawerHeader = styled.div`
  display: flex;

  padding-bottom: 50px;
`;

export const ItemRow = styled.div<{$flex: number}>`
  display: flex;
  align-items: center;
  flex: ${({$flex}) => $flex};
  justify-content: space-between;
`;

export const DrawerContent = styled.div``;
