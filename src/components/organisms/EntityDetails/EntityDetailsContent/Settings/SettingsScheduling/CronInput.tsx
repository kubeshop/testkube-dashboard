import {Input, Tooltip} from 'antd';

type CronInputProps = {
  value: string;
  title: string;
  onChange: (value: string) => void;
};

const CronInput: React.FC<CronInputProps> = props => {
  const {value, title, onChange} = props;

  return (
    <Tooltip title={title}>
      <Input
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

export default CronInput;
