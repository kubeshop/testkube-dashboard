import {Dropdown} from 'antd';

import {IntersectionContainer} from '../SettingsTests.styled';

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
    </>
  );
};

export default AddNode;
