import {FC} from 'react';

import {Input, InputProps} from 'antd';

import {Text} from '@custom-antd/Typography/Text';

import {Colors} from '@styles/Colors';

export const CommandInput: FC<InputProps> = props => {
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
