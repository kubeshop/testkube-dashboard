import {ReactNode} from 'react';

import {Dropdown} from 'antd';

type AddStepDropdownProps = {
  children: ReactNode;
  before?: boolean;
  data: {
    showTestModal: (group: number) => void;
    showDelayModal: (group: number) => void;
    group: number;
  };
};

const AddStepDropdown: React.FC<AddStepDropdownProps> = props => {
  const {data, before = false, children} = props;
  const group = data.group + (before ? -0.5 : 0);

  return (
    <Dropdown
      overlayClassName="light-dropdown"
      trigger={['hover']}
      menu={{
        items: [
          {key: 1, label: <span onClick={() => data.showTestModal(group)}>Add a test</span>},
          {key: 2, label: <span onClick={() => data.showDelayModal(group)}>Add a delay</span>},
        ],
      }}
    >
      {children}
    </Dropdown>
  );
};
export default AddStepDropdown;
