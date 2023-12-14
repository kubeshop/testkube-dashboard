import {memo, useCallback, useMemo} from 'react';

import {Popover} from 'antd';

import {StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {formatExecutionDate} from '@utils/formatDate';

import {
  BarDate,
  ClickableBar,
  StyledPopoverContainer,
  StyledPopoverContent,
  StyledPopoverHeader,
} from '../MetricsBarChart.styled';

import type {BarConfig} from './BarWithTooltip';

const tooltipYOffsetMargin = 5;

type BarConfigPure = BarConfig & {
  onSelect: (id: string) => void;
};

const BarWithTooltipPure: React.FC<BarConfigPure> = memo(props => {
  const {width, height, color, status, duration, name, startTime, chartHeight, hoverColor, date, onSelect} = props;

  const onBarClicked = useCallback(() => onSelect(name), [onSelect, name]);

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
    <Popover content={popoverContent} align={{offset: [0, tooltipYOffsetMargin]}}>
      <ClickableBar style={{height, width}} $color={color} hoverColor={hoverColor} onClick={onBarClicked}>
        {date ? <BarDate $height={height}>{date}</BarDate> : undefined}
      </ClickableBar>
    </Popover>
  );
});

export default BarWithTooltipPure;
