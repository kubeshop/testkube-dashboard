import {StatusColors} from '@styles/Colors';

import {BarWrapper} from './MetricsBarChart.styled';

type BarConfig = {
  width: number;
  height: number;
  color: StatusColors;
  margin: number;
  onBarClicked?: () => void;
};

const Bar: React.FC<BarConfig> = props => {
  const {width, height, color, margin, onBarClicked} = props;

  return <BarWrapper $margin={margin} style={{height, background: color}} $width={width} onClick={onBarClicked} />;
};

export default Bar;
