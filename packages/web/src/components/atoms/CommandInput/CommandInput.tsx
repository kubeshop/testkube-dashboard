import {Input, InputProps} from 'antd';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

const CommandInput: React.FC<InputProps> = props => {
  return (
    <Input
      placeholder="e.g.: myscript.sh"
      prefix={
        <Text className="big regular" color={Colors.slate500}>
          $
        </Text>
      }
      {...props}
    />
  );
};

export default CommandInput;
