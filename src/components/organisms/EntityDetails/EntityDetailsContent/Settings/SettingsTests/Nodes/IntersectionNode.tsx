import {Handle, Position} from 'reactflow';

import {IntersectionContainer} from '../SettingsTests.styled';

import AddStepDropdown from './AddStepDropdown';

type IntersectionNodeProps = {
  data: {
    showTestModal: (group: number | string) => void;
    showDelayModal: (group: number | string) => void;
    group: number | string;
  };
};
const IntersectionNode: React.FC<IntersectionNodeProps> = props => {
  const {data} = props;

  return (
    <>
      <Handle type="target" position={Position.Left} />
      <AddStepDropdown data={data}>
        <IntersectionContainer>+</IntersectionContainer>
      </AddStepDropdown>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default IntersectionNode;
