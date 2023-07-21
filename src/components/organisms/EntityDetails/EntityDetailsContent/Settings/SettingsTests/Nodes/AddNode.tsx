import {IntersectionContainer} from '../SettingsTests.styled';

import AddStepDropdown from './AddStepDropdown';

type AddNodeProps = {
  data: {
    stepLength: number;
    showTestModal: (group: number) => void;
    showDelayModal: (group: number) => void;
    group: number;
  };
};

const AddNode: React.FC<AddNodeProps> = props => {
  const {data} = props;

  return (
    <>
      <AddStepDropdown data={data}>
        <IntersectionContainer>+</IntersectionContainer>
      </AddStepDropdown>
    </>
  );
};

export default AddNode;
