import React from 'react';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

type SplittedLabelProps = {
  value: string;
};
export const SplittedLabel: React.FC<SplittedLabelProps> = props => {
  const {value} = props;

  if (!value.includes(':')) {
    return (
      <Text color={Colors.slate200} className="regular">
        {value}
      </Text>
    );
  }

  const [key, ...rest] = value.split(':');
  return (
    <>
      <Text color={Colors.slate400} className="regular">
        {key}:{' '}
      </Text>
      <Text color={Colors.slate200} className="regular">
        {rest.join(':')}
      </Text>
    </>
  );
};
