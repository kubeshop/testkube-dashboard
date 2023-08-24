import {FC} from 'react';
import {Handle, Position} from 'reactflow';

import {IntersectionContainer} from '@pages/TestSuites/TestSuiteDetails/TestSuiteSettings/SettingsTests.styled';

import {AddStepDropdown} from './AddStepDropdown';

type IntersectionNodeProps = {
  data: {
    showTestModal: (group: number) => void;
    showDelayModal: (group: number) => void;
    group: number;
    last: boolean;
  };
};
export const IntersectionNode: FC<IntersectionNodeProps> = props => {
  const {data} = props;

  return (
    <>
      {data.group === 0 ? null : <Handle type="target" position={Position.Left} isConnectable={false} />}
      <AddStepDropdown data={data} before>
        <IntersectionContainer>+</IntersectionContainer>
      </AddStepDropdown>
      {data.last ? null : <Handle type="source" position={Position.Right} isConnectable={false} />}
    </>
  );
};
