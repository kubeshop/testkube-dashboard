import {FC} from 'react';

import {Input, Tooltip} from 'antd';

type CronInputProps = {
  value: string;
  title: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export const CronInput: FC<CronInputProps> = props => {
  const {value, title, disabled, onChange} = props;

  return (
    <Tooltip title={title}>
      <Input
        disabled={disabled}
        placeholder={title}
        value={value === '*' ? '' : value}
        onChange={e => {
          if (e.target.value === '') {
            onChange('*');
          } else {
            onChange(e.target.value.trim());
          }
        }}
      />
    </Tooltip>
  );
};
