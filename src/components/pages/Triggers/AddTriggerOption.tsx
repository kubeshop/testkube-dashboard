import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {OptionWrapper} from './Triggers.styled';

type AddTriggerOptionProps = {
  label: string;
  description: string;
  onSelect: () => void;
};

const AddTriggerOption: React.FC<AddTriggerOptionProps> = props => {
  const {label, description, onSelect} = props;

  return (
    <OptionWrapper onClick={onSelect}>
      <Text className="regular middle" color={Colors.slate100}>
        {label}
      </Text>
      <Text className="regular small" color={Colors.slate400}>
        {description}
      </Text>
    </OptionWrapper>
  );
};

export default AddTriggerOption;
