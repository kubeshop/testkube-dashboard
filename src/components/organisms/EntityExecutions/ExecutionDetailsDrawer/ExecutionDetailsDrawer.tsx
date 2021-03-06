import {useContext} from 'react';

import {ExecutionDetails} from '@molecules';

import {EntityExecutionsContext} from '@contexts';

import {ExecutionDetailsDrawerWrapper} from './ExecutionDetailsDrawer.styled';

const ExecutionDetailsDrawer: React.FC = () => {
  const {isRowSelected, selectedRow} = useContext(EntityExecutionsContext);

  return (
    <ExecutionDetailsDrawerWrapper
      $isRowSelected={isRowSelected}
      animate={{width: isRowSelected ? '40%' : '0px'}}
      transition={{type: 'just'}}
    >
      {selectedRow ? <ExecutionDetails /> : null}
    </ExecutionDetailsDrawerWrapper>
  );
};

export default ExecutionDetailsDrawer;
