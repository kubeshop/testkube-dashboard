import React, {forwardRef, memo, useCallback} from 'react';

import {Tooltip} from 'antd';

import {ExecutorIcon, StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import {DotsDropdown, LabelsList, MetricsBarChart, notificationCall} from '@molecules';

import {displayTimeBetweenDates} from '@utils/displayTimeBetweenDates';
import {formatDuration, formatExecutionDate} from '@utils/formatDate';

import Colors from '@styles/Colors';

import {DetailsWrapper, ItemColumn, ItemRow, ItemWrapper, RowsWrapper, StyledMetricItem} from './EntityGrid.styled';

const EntityGridItemPure: React.FC<any> = memo(
  forwardRef<HTMLDivElement, any>((props, ref) => {
    const {item, onClick, entity, metrics, abortAllExecutions} = props;
    const {dataItem, latestExecution} = item;

    const status = latestExecution ? latestExecution?.executionResult?.status || latestExecution?.status : 'pending';
    const executions = metrics?.executions;
    const dataTestValue = `${entity}-list-item`;

    const click = useCallback(() => {
      onClick(item);
    }, [onClick, item]);

    const onAbortAllExecutionsClick = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      abortAllExecutions({id: dataItem?.name}).catch(() => {
        notificationCall('failed', `Something went wrong during ${entity} execution abortion`);
      });
    };

  const click = useCallback(() => {
    onClick(item);
  }, [onClick, item]);

  return (
    <ItemWrapper onClick={click} ref={ref} data-test={dataTestValue}>
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
              <Text color={Colors.slate200} className="regular small">
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
  })
);

export default EntityGridItemPure;
