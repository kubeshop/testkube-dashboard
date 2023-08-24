import {FC} from 'react';

import {Segmented} from 'antd';

type TriggerSelectorSwitcherProps = {
  value: string;
  onChange: (value: string) => void;
};

export const TriggerSelectorSwitcher: FC<TriggerSelectorSwitcherProps> = props => {
  const {value, onChange} = props;

  return (
    <Segmented
      options={[
        {label: 'BY LABEL', value: 'label'},
        {label: 'BY NAME', value: 'name'},
      ]}
      value={value}
      onChange={x => onChange(String(x))}
    />
  );
};
