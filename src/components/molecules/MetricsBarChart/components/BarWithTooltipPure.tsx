import {memo, useCallback, useMemo} from 'react';

import {Popover} from 'antd';

import {StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {formatExecutionDate} from '@utils/formatDate';

import {
  BarDate,
  ClickableBar,
  ClickableBarWrapper,
  StyledPopoverContainer,
  StyledPopoverContent,
  StyledPopoverHeader,
} from '../MetricsBarChart.styled';

import type {BarConfig} from './BarWithTooltip';

const tooltipYOffsetMargin = 5;

type BarConfigPure = BarConfig & {
  executions: any;
  openExecutionDetails: (id: string) => void;
};

const BarWithTooltipPure: React.FC<BarConfigPure> = memo(props => {
  const {width, height, color, tooltipData, hoverColor, date, chartHeight, executions, openExecutionDetails} = props;
  const {status, duration, name, startTime} = tooltipData;

  const onBarClicked = useCallback(() => {
    if (executions?.results) {
      const targetRecord = executions.results.find((item: any) => item.name === name);

      if (targetRecord) {
        openExecutionDetails(targetRecord.id);
      }
    }
  }, [executions?.results, openExecutionDetails, name]);

  const popoverContent = useMemo(
    () => (
      <StyledPopoverContainer onClick={onBarClicked}>
        <StyledPopoverHeader>
          <StatusIcon status={status} />
          <Text className="regular middle">
            {name.length > 50 ? `${name.slice(0, 30)}...${name.slice(-10)}` : name}
          </Text>
        </StyledPopoverHeader>
        <StyledPopoverContent>
          <Text color={Colors.slate400}>Executed</Text>
          <Text color={Colors.slate200}>{formatExecutionDate(new Date(startTime))}</Text>
          <Text color={Colors.slate400}>Duration</Text>
          <Text color={Colors.slate200}>{duration}</Text>
        </StyledPopoverContent>
      </StyledPopoverContainer>
    ),
    [status, name, duration, startTime]
  );

  return (
    <Popover content={popoverContent} align={{offset: [0, chartHeight - height - tooltipYOffsetMargin]}}>
      <ClickableBarWrapper borderTop={chartHeight - height} hoverColor={hoverColor}>
        <ClickableBar style={{height, width}} $color={color} hoverColor={hoverColor} onClick={onBarClicked} />
        {date ? (
          <BarDate $height={height}>
            <Text color={Colors.slate400}>{date}</Text>
          </BarDate>
        ) : null}
      </ClickableBarWrapper>
    </Popover>
  );
});

export default BarWithTooltipPure;
