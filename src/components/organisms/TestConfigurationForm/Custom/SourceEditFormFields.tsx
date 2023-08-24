import {FC} from 'react';

import {Path} from '@molecules/GitFormItems/Path';
import {Revision} from '@molecules/GitFormItems/Revision';

import {StyledFormSpace} from '@organisms/TestConfigurationForm.styled';
import type {Props} from '@organisms/TestConfigurationForm/utils';

export const CustomFormFields: FC<Partial<Props>> = props => {
  const {executorType} = props as Pick<Props, 'executorType'>;

  return (
    <StyledFormSpace size={24} direction="vertical">
      <Revision />
      <Path testType={executorType} />
    </StyledFormSpace>
  );
};
