import {FC} from 'react';

import {Button} from '@custom-antd/Button';

import {Colors} from '@styles/Colors';

import {Dot, DotsContainer} from './Dots.styled';

type DotsProps = {
  dotNumber?: number;
  color?: Colors;
  direction?: 'column' | 'row';
  withPadding?: boolean;
};

export const Dots: FC<DotsProps> = props => {
  const {dotNumber = 3, color = Colors.purple, direction = 'column', withPadding = true} = props;

  const dots = Array.from({length: dotNumber}).map((_, index) => {
    const key = `dot_${index}`;

    return <Dot key={key} color={color} />;
  });

  return (
    <Button $customType="transparent" $withPadding={withPadding}>
      <DotsContainer $direction={direction}>{dots}</DotsContainer>
    </Button>
  );
};
