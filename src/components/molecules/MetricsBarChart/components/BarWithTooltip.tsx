import {useCallback, useContext, useMemo} from 'react';

import {Popover} from 'antd';

import {StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import {formatExecutionDate} from '@utils/formatDate';

import Colors, {SecondaryStatusColors, StatusColors} from '@styles/Colors';

import {EntityDetailsContext} from '@contexts';

import {
  BarDate,
  ClickableBarWrapper,
  StyledPopoverContainer,
  StyledPopoverContent,
  StyledPopoverHeader,
} from '../MetricsBarChart.styled';

type BarConfig = {
  width: number;
  height: number;
  color: StatusColors;
  inactiveColor: SecondaryStatusColors;
  tooltipData: any;
  margin: number;
  date?: string;
};

const BarWithTooltip: React.FC<BarConfig> = props => {
  const {width, height, color, tooltipData, margin, inactiveColor, date} = props;
  const {executionsList, onRowSelect} = useContext(EntityDetailsContext);
  const {status, duration, name, startTime} = tooltipData;

  const onBarClicked = useCallback(() => {
    if (executionsList?.results) {
      const targetRecord = executionsList.results.find((item: any) => item.name === name);

      if (targetRecord) {
        onRowSelect(targetRecord, true);
      }
    }
  }, [executionsList?.results, onRowSelect, name]);

  const popoverContent = useMemo(
    () => (
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
    ),
    [status, name, duration, startTime]
  );

  return (
    <Popover content={popoverContent} color={Colors.slate700}>
      <span style={{position: 'relative'}}>
        <ClickableBarWrapper
          $margin={margin}
          style={{height, width}}
          $color={color}
          inactiveColor={inactiveColor}
          onClick={onBarClicked}
        />
        {date ? <BarDate $height={height}>{date}</BarDate> : null}
      </span>
    </Popover>
  );
};

export default BarWithTooltip;
