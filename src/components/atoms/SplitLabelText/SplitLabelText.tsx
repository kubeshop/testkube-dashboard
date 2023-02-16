import React from 'react';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

type SplitLabelProps = {
  value: string;
  textClassName?: string;
};

const SplitLabelText: React.FC<SplitLabelProps> = props => {
  const {value, textClassName = 'regular'} = props;

  if (!value.includes(':')) {
    return (
      <Text color={Colors.slate400} className={textClassName}>
        {value}
      </Text>
    );
  }

  const [key, ...rest] = value.split(':');

  return (
    <>
      <Text color={Colors.slate400} className={textClassName}>
        {key}:{' '}
      </Text>
      <Text color={Colors.slate200} className={textClassName}>
        {rest.join(':')}
      </Text>
    </>
  );
};

export default SplitLabelText;
