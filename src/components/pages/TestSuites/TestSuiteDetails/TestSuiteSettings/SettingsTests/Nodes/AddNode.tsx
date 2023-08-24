import {FC} from 'react';

import {IntersectionContainer} from '@pages/TestSuites/TestSuiteDetails/TestSuiteSettings/SettingsTests.styled';

import {AddStepDropdown} from './AddStepDropdown';

type AddNodeProps = {
  data: {
    showTestModal: (group: number) => void;
    showDelayModal: (group: number) => void;
    group: number;
  };
};

export const AddNode: FC<AddNodeProps> = props => {
  const {data} = props;

  return (
    <>
      <AddStepDropdown data={data}>
        <IntersectionContainer>+</IntersectionContainer>
      </AddStepDropdown>
    </>
  );
};
