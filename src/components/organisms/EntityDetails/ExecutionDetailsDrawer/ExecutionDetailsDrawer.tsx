import {useContext} from 'react';

import {ExecutionDetails} from '@molecules';

import {EntityDetailsContext} from '@contexts';

import {ExecutionDetailsDrawerWrapper} from './ExecutionDetailsDrawer.styled';

const ExecutionDetailsDrawer: React.FC = () => {
  const {isRowSelected, selectedRow} = useContext(EntityDetailsContext);

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
