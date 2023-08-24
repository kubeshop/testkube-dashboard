import {FC, ReactNode} from 'react';

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

export const AddStepDropdown: FC<AddStepDropdownProps> = props => {
  const {data, before = false, children} = props;
  const group = data.group + (before ? -0.5 : 0);

  return (
    <Dropdown
      overlayClassName="light-dropdown"
      trigger={['hover']}
      menu={{
        items: [
          {key: 1, label: 'Add a test', onClick: () => data.showTestModal(group)},
          {key: 2, label: 'Add a delay', onClick: () => data.showDelayModal(group)},
        ],
      }}
    >
      {children}
    </Dropdown>
  );
};
