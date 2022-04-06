import Colors from '@styles/Colors';

import {Dot, DotsContainer} from './Dots.styled';

type DotsProps = {
  dotNumber?: number;
  color?: Colors;
};

const Dots: React.FC<DotsProps> = props => {
  const {dotNumber = 3, color = Colors.purple} = props;

  const dots = Array.from({length: dotNumber}).map((_, index) => {
    const key = `dot_${index}`;

    return <Dot key={key} color={color} />;
  });

  return <DotsContainer>{dots}</DotsContainer>;
};

export default Dots;
