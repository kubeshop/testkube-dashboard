import React from 'react';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

type SplittedLabelProps = {
  value: string;
  textClassName?: string;
};

export const SplittedLabel: React.FC<SplittedLabelProps> = props => {
  const {value, textClassName = 'regular'} = props;

  if (!value.includes(':')) {
    return (
      <Text color={Colors.slate200} className={textClassName}>
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
