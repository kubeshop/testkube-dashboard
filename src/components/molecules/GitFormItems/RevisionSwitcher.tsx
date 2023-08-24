import {FC} from 'react';

import {Segmented} from 'antd';

type RevisionSwitcherProps = {
  value: string | number;
  onChange: (value: string | number) => void;
};

export const RevisionSwitcher: FC<RevisionSwitcherProps> = props => {
  const {value, onChange} = props;

  return (
    <Segmented
      options={[
        {label: 'BRANCH', value: 'branch'},
        {label: 'COMMIT', value: 'commit'},
      ]}
      value={value}
      onChange={onChange}
    />
  );
};
