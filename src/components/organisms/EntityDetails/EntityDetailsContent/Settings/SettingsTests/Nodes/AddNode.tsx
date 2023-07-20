import {IntersectionContainer} from '../SettingsTests.styled';

import AddStepDropdown from './AddStepDropdown';

type AddNodeProps = {
  data: {
    stepLength: number;
    showTestModal: (group: number | string) => void;
    showDelayModal: (group: number | string) => void;
    group: number | string;
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
