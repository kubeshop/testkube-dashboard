import {ReactNode} from 'react';

import {Dropdown} from 'antd';

type AddStepDropdownProps = {
  children: ReactNode;
  data: {
    showTestModal: (group: number | string) => void;
    showDelayModal: (group: number | string) => void;
    group: number | string;
  };
};

const AddStepDropdown: React.FC<AddStepDropdownProps> = props => {
  const {data, children} = props;

  return (
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
      {children}
    </Dropdown>
  );
};
export default AddStepDropdown;
