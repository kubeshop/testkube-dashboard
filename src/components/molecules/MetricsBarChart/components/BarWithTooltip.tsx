import {useCallback, useContext, useMemo, useState} from 'react';

import {Popover} from 'antd';

import {StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import {formatExecutionDate} from '@utils/formatDate';

import Colors, {SecondaryStatusColors, StatusColors} from '@styles/Colors';

import {EntityDetailsContext} from '@contexts';

import {
  BarDate,
  ClickableBar,
  ClickableBarWrapper,
  StyledPopoverContainer,
  StyledPopoverContent,
  StyledPopoverHeader,
} from '../MetricsBarChart.styled';

type BarConfig = {
  width: number;
  height: number;
  color: StatusColors;
  hoverColor: SecondaryStatusColors;
  tooltipData: any;
  date?: string;
  chartHeight: number;
};

const tooltipYOffsetMargin = 5;

const BarWithTooltip: React.FC<BarConfig> = props => {
  const {width, height, color, tooltipData, hoverColor, date, chartHeight} = props;
  const {status, duration, name, startTime} = tooltipData;

  const {executionsList, onRowSelect} = useContext(EntityDetailsContext);

  const [isHovered, setIsHovered] = useState(false);

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
          <Text className="regular middle">
            {name.length > 50 ? `${name.slice(0, 30)}...${name.slice(-10)}` : name}
          </Text>
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
    <Popover
      content={popoverContent}
      color={Colors.slate700}
      align={{offset: [0, chartHeight - height - tooltipYOffsetMargin]}}
      onOpenChange={visible => setIsHovered(visible)}
    >
      <ClickableBarWrapper borderTop={chartHeight - height}>
        <ClickableBar
          style={{height, width}}
          $color={color}
          hoverColor={hoverColor}
          onClick={onBarClicked}
          isHovered={isHovered}
        />
        {date ? <BarDate $height={height}>{date}</BarDate> : null}
      </ClickableBarWrapper>
    </Popover>
  );
};

export default BarWithTooltip;
