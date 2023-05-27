import {Segmented} from 'antd';

type TriggerSelectorSwitcherProps = {
  value: string | number;
  onChange: (value: string | number) => void;
};

const TriggerSelectorSwitcher: React.FC<TriggerSelectorSwitcherProps> = props => {
  const {value, onChange} = props;

  return (
    <Segmented
      options={[
        {label: 'BY LABEL', value: 'label'},
        {label: 'BY NAME', value: 'name'},
      ]}
      value={value}
      onChange={onChange}
    />
  );
};

export default TriggerSelectorSwitcher;
