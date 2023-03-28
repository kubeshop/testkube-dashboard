import React, {useContext, useEffect, useRef} from 'react';

import {Tooltip} from 'antd';

import {initialPageSize} from '@redux/initialState';

import {ExecutorIcon, StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import {LabelsList, MetricsBarChart} from '@molecules';

import {EntityListContext} from '@organisms/EntityList/EntityListContainer/EntityListContainer';

import useInViewport from '@hooks/useInViewport';

import {displayTimeBetweenDates} from '@utils/displayTimeBetweenDates';
import {formatDuration, formatExecutionDate} from '@utils/formatDate';
import {PollingIntervals} from '@utils/numbers';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {DetailsWrapper, ItemColumn, ItemRow, ItemWrapper, RowsWrapper, StyledMetricItem} from './EntityGrid.styled';

const EntityGridItem: React.FC<any> = props => {
  const {item, onClick, isLastItemIndex} = props;
  const {dataItem, latestExecution} = item;

  const {dispatch} = useContext(MainContext);
  const {useGetMetrics, entity, queryFilters, setQueryFilters} = useContext(EntityListContext);

  const status = latestExecution ? latestExecution?.executionResult?.status || latestExecution?.status : 'pending';

  const ref = useRef(null);

  const isInViewport = useInViewport(ref);

  const {data: metrics} = useGetMetrics(
    {id: dataItem.name, last: 7, limit: 13},
    {skip: !isInViewport, pollingInterval: PollingIntervals.halfMin}
  );

  const executions = metrics?.executions || [];

  const dataTestValue = `${entity}-list-item`;

  useEffect(() => {
    if (isLastItemIndex && isInViewport && queryFilters.pageSize <= isLastItemIndex + initialPageSize) {
      dispatch(setQueryFilters({...queryFilters, pageSize: queryFilters.pageSize + initialPageSize}));
    }
  }, [isInViewport, isLastItemIndex]);

  return (
    <ItemWrapper onClick={onClick} ref={ref} data-test={dataTestValue}>
      <DetailsWrapper>
        <ItemRow $flex={0}>
          <ItemColumn $isStretch>
            <StatusIcon status={status} />
            {dataItem?.type ? <ExecutorIcon type={dataItem?.testIcon} /> : null}
            <div style={{overflow: 'hidden', flex: 1, display: 'flex'}}>
              <Text className="regular big" ellipsis title={dataItem?.name}>
                {dataItem?.name}
              </Text>
            </div>
          </ItemColumn>
          <ItemColumn>
            <Tooltip
              title={latestExecution?.startTime ? formatExecutionDate(new Date(latestExecution?.startTime)) : null}
              placement="bottomRight"
              mouseEnterDelay={0.39}
              mouseLeaveDelay={0.1}
            >
              <Text className="regular small" color={Colors.slate200}>
                {latestExecution?.startTime
                  ? displayTimeBetweenDates(new Date(), new Date(latestExecution?.startTime)).long
                  : null}
              </Text>
            </Tooltip>
          </ItemColumn>
        </ItemRow>
        <RowsWrapper>
          <ItemRow $flex={1}>
            {dataItem?.labels ? (
              <LabelsList labels={dataItem?.labels} shouldSkipLabels howManyLabelsToShow={2} />
            ) : null}
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
              <MetricsBarChart data={executions} chartHeight={38} barWidth={6} />
            </StyledMetricItem>
          </ItemRow>
        </RowsWrapper>
      </DetailsWrapper>
    </ItemWrapper>
  );
};

export default EntityGridItem;
