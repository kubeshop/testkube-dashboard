import {useCallback, useContext} from 'react';

import {Popover} from 'antd';

import {StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import {formatExecutionDate} from '@utils/formatDate';

import Colors, {StatusColors} from '@styles/Colors';

import {EntityDetailsContext} from '@contexts';

import {BarWrapper, StyledPopoverContainer, StyledPopoverContent, StyledPopoverHeader} from './MetricsBarChart.styled';

type BarConfig = {
  width: number;
  height: number;
  color: StatusColors;
  tooltipData: any;
  margin: number;
};

const Bar: React.FC<BarConfig> = props => {
  const {width, height, color, tooltipData, margin} = props;
  const {executionsList, onRowSelect} = useContext(EntityDetailsContext);
  const {status, duration, name, startTime} = tooltipData;

  const onBarClicked = useCallback(() => {
    if (executionsList.results) {
      onRowSelect(
        executionsList.results.find((item: any) => item.name === name),
        true
      );
    }
  }, [executionsList.results, onRowSelect, name]);

  const popoverContent = (
    <StyledPopoverContainer>
      <StyledPopoverHeader>
        <StatusIcon status={status} />
        <Text className="regular middle">{name}</Text>
      </StyledPopoverHeader>
      <StyledPopoverContent>
        <Text className="regular small" color={Colors.slate400}>
          Executed
        </Text>
        <Text className="regular small" color={Colors.slate200}>
          {formatExecutionDate(new Date(startTime))}
        </Text>
        <Text className="regular small" color={Colors.slate400}>
          Duration
        </Text>
        <Text className="regular small" color={Colors.slate200}>
          {duration}
        </Text>
      </StyledPopoverContent>
    </StyledPopoverContainer>
  );

  return (
    <Popover content={popoverContent} color={Colors.slate700}>
      <BarWrapper $margin={margin} style={{height, background: color}} $width={width} onClick={onBarClicked} />
    </Popover>
  );
};

export default Bar;
