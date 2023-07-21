import {Handle, Position} from 'reactflow';

import {IntersectionContainer} from '../SettingsTests.styled';

import AddStepDropdown from './AddStepDropdown';

type IntersectionNodeProps = {
  data: {
    showTestModal: (group: number) => void;
    showDelayModal: (group: number) => void;
    group: number;
    last: boolean;
  };
};
const IntersectionNode: React.FC<IntersectionNodeProps> = props => {
  const {data} = props;

  return (
    <>
      <Handle type="target" position={Position.Left} isConnectable={false} />
      <AddStepDropdown data={data}>
        <IntersectionContainer>+</IntersectionContainer>
      </AddStepDropdown>
      {data.last ? null : <Handle type="source" position={Position.Right} isConnectable={false} />}
    </>
  );
};

export default IntersectionNode;
