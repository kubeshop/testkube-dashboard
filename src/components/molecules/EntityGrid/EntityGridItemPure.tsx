import React, {RefObject, forwardRef, memo, useCallback, useContext} from 'react';

import {Tooltip} from 'antd';

import {ExecutorIcon, StatusIcon} from '@atoms';

import {DashboardContext} from '@contexts';

import {Text} from '@custom-antd';

import {Entity} from '@models/entity';
import {Execution} from '@models/execution';

import {LabelsList, MetricsBarChart} from '@molecules';

import Colors from '@styles/Colors';

import {displayTimeBetweenDates} from '@utils/displayTimeBetweenDates';
import {formatDuration, formatExecutionDate} from '@utils/formatDate';

import {DetailsWrapper, ItemColumn, ItemRow, ItemWrapper, RowsWrapper, StyledMetricItem} from './EntityGrid.styled';

interface EntityGridItemPureProps {
  item: any;
  metrics: any;
  href: string;
  entity: Entity;
  latestExecution?: Execution;
  ref?: RefObject<HTMLAnchorElement>;
}

const EntityGridItemPure: React.FC<EntityGridItemPureProps> = memo(
  forwardRef<HTMLAnchorElement, any>((props, ref) => {
    const {item, latestExecution, href, entity, metrics} = props;
    const {navigate} = useContext(DashboardContext);

    const status = latestExecution ? latestExecution?.executionResult?.status || latestExecution?.status : 'pending';
    const executions = metrics?.executions;
    const dataTestValue = `${entity}-list-item`;

    return (
      <ItemWrapper
        href={href}
        onClick={e => {
          e.preventDefault();
          // TODO Make it working for Cloud
          navigate(href);
        }}
        ref={ref}
        data-test={dataTestValue}
      >
        <DetailsWrapper>
          <ItemRow $flex={0}>
            <ItemColumn $isStretch>
              <StatusIcon status={status} />
              {item.type ? <ExecutorIcon type={item.testIcon} /> : null}
              <div style={{overflow: 'hidden', flex: 1, display: 'flex'}}>
                <Text className="regular big" ellipsis title={item.name}>
                  {item.name}
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
              {item.labels ? <LabelsList labels={item.labels} shouldSkipLabels howManyLabelsToShow={2} /> : null}
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
