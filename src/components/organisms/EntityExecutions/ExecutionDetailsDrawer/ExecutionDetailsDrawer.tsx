/* eslint-disable unused-imports/no-unused-imports-ts */
import {useContext} from 'react';

import {motion} from 'framer-motion';

import {StatusIcon} from '@atoms';

import {Text, Title} from '@custom-antd';

import Colors from '@styles/Colors';

import ExecutionDetails from '@src/components/molecules/ExecutionDetails';

import {EntityExecutionsContext} from '../EntityExecutionsContainer/EntityExecutionsContainer';
import {DetailsWrapper, ItemColumn} from '../EntityExecutionsContent/EntityExecutionsContent.styled';
import {DrawerContent, DrawerHeader, ExecutionDetailsDrawerWrapper, ItemRow} from './ExecutionDetailsDrawer.styled';

const ExecutionDetailsDrawer: React.FC = () => {
  const {isRowSelected, selectedRow, unselectRow} = useContext(EntityExecutionsContext);

  return (
    <ExecutionDetailsDrawerWrapper
      $isRowSelected={isRowSelected}
      onClick={() => {
        unselectRow();
      }}
      animate={{width: isRowSelected ? '40%' : '0px'}}
      transition={{type: 'just'}}
    >
      {selectedRow ? <ExecutionDetails /> : null}
    </ExecutionDetailsDrawerWrapper>
  );
};

export default ExecutionDetailsDrawer;
