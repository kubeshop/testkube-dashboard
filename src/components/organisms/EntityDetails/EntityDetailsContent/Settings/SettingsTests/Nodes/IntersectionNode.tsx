import {Handle, Position} from 'reactflow';

import {Dropdown} from 'antd';

import {IntersectionContainer} from '../SettingsTests.styled';

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
      <Dropdown
        overlayClassName="light-dropdown"
        trigger={['hover']}
        menu={{
          items: [
            {key: 1, label: <span onClick={() => data.showTestModal(data.group)}>Add a test</span>},
            {key: 2, label: <span onClick={() => data.showDelayModal(data.group)}>Add a delay</span>},
          ],
        }}
      >
        <IntersectionContainer>+</IntersectionContainer>
      </Dropdown>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default IntersectionNode;
