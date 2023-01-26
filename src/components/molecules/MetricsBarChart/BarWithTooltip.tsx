import {useCallback, useContext, useMemo} from 'react';

import {Popover} from 'antd';

import {StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import {timeElapsedSince} from '@utils/timeElapsedSince';

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

const BarWithTooltip: React.FC<BarConfig> = props => {
  const {width, height, color, tooltipData, margin} = props;
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
            {timeElapsedSince(new Date())(new Date(startTime)).long}
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
      <BarWrapper $margin={margin} style={{height, background: color}} $width={width} onClick={onBarClicked} />
    </Popover>
  );
};

export default BarWithTooltip;
