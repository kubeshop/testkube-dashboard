import {Segmented} from 'antd';

type TriggerSelectorSwitcherProps = {
  value: string;
  onChange: (value: string) => void;
};

const TriggerSelectorSwitcher: React.FC<TriggerSelectorSwitcherProps> = props => {
  const {value, onChange, ...rest} = props;

  return (
    <Segmented
      {...rest}
      options={[
        {label: 'BY LABEL', value: 'label'},
        {label: 'BY NAME', value: 'name'},
      ]}
      value={value}
      onChange={x => onChange(String(x))}
    />
  );
};

export default TriggerSelectorSwitcher;
