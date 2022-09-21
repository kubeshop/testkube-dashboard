import {useContext, useRef} from 'react';

import {format} from 'date-fns';

import {StatusIcon, TestRunnerIcon} from '@atoms';

import {Text} from '@custom-antd';

import {LabelsList, MetricsBarChart} from '@molecules';

import {EntityListContext} from '@organisms/EntityList/EntityListContainer/EntityListContainer';

import useInViewport from '@hooks/useInViewport';

import {formatDuration} from '@utils/formatDate';
import {PollingIntervals} from '@utils/numbers';
import {executionDateFormat} from '@utils/strings';

import Colors from '@styles/Colors';

import {DetailsWrapper, ItemColumn, ItemRow, ItemWrapper, StyledMetricItem} from './EntityGrid.styled';

const EntityGridItem: React.FC<any> = props => {
  const {item, onClick} = props;
  const {dataItem, latestExecution} = item;
  const {useGetMetrics} = useContext(EntityListContext);

  const status = latestExecution ? latestExecution?.executionResult?.status || latestExecution?.status : 'pending';
  const startDate = latestExecution?.startTime ? format(new Date(latestExecution?.startTime), executionDateFormat) : '';

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics} = useGetMetrics(
    {id: dataItem.name, last: 7},
    {skip: !isInViewport, pollingInterval: PollingIntervals.long}
  );

  const executions = metrics?.executions || [];
  return (
    <ItemWrapper onClick={onClick} ref={ref}>
      <StatusIcon status={status} />
      <DetailsWrapper>
        <ItemRow $flex={1}>
          <ItemColumn>
            {dataItem?.type ? <TestRunnerIcon icon={dataItem?.type} /> : null}
            <Text className="regular big">{dataItem?.name}</Text>
            {dataItem?.labels ? <LabelsList labels={dataItem?.labels} /> : null}
          </ItemColumn>
          <ItemColumn>
            <Text className="regular small" color={Colors.slate200}>
              {startDate}
            </Text>
          </ItemColumn>
        </ItemRow>
        <ItemRow $flex={1}>
          <StyledMetricItem>
            <Text className="small uppercase" color={Colors.slate500}>
              pass/fail ratio
            </Text>
            <Text className="big regular">
              {metrics?.passFailRatio ? `${metrics?.passFailRatio.toFixed(2)}%` : '0%'}
            </Text>
          </StyledMetricItem>
          <StyledMetricItem>
            <Text className="small uppercase" color={Colors.slate500}>
              p50
            </Text>
            <Text className="big regular">
              {metrics?.executionDurationP50ms ? formatDuration(metrics?.executionDurationP50ms / 1000) : '-'}
            </Text>
          </StyledMetricItem>
          <StyledMetricItem>
            <Text className="small uppercase" color={Colors.slate500}>
              failed executions
            </Text>
            <Text className="big regular">{metrics?.failedExecutions || '-'}</Text>
          </StyledMetricItem>
          <StyledMetricItem>
            <MetricsBarChart data={executions.slice(0, 13)} chartHeight={38} barWidth={6} />
          </StyledMetricItem>
        </ItemRow>
      </DetailsWrapper>
    </ItemWrapper>
  );
};

export default EntityGridItem;
