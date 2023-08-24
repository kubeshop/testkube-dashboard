import {FC} from 'react';

import {StyledExecutionName} from './ExecutionName.styled';

type ExecutionNameProps = {
  name: string;
};

export const ExecutionName: FC<ExecutionNameProps> = props => {
  const {name} = props;

  return <StyledExecutionName ellipsis>{name}</StyledExecutionName>;
};
