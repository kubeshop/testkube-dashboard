import {Button} from '@custom-antd';

import Colors from '@styles/Colors';

import {Dot, DotsContainer} from './Dots.styled';

type DotsProps = {
  dotNumber?: number;
  color?: Colors;
  direction?: 'column' | 'row';
  withPadding?: boolean;
  disabled?: boolean;
};

const Dots: React.FC<DotsProps> = props => {
  const {dotNumber = 3, color = Colors.purple, direction = 'column', withPadding = true, disabled} = props;

  const dots = Array.from({length: dotNumber}).map((_, index) => {
    const key = `dot_${index}`;

    return <Dot key={key} color={disabled ? Colors.grey800 : color} />;
  });

  return (
    <Button $customType="transparent" $withPadding={withPadding} disabled={disabled}>
      <DotsContainer $direction={direction}>{dots}</DotsContainer>
    </Button>
  );
};

export default Dots;
