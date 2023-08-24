import {FC, MouseEvent, forwardRef, memo, useCallback} from 'react';

import {ExecutorIcon} from '@atoms/ExecutorIcon';
import {StatusIcon} from '@atoms/StatusIcon';

import {Text} from '@custom-antd/Typography/Text';

import {useExecutorIcon} from '@hooks/useExecutorIcon';

import type {Execution} from '@models/execution';
import type {ExecutionMetrics} from '@models/metrics';
import type {TestSuiteExecution} from '@models/testSuiteExecution';

import {DotsDropdown} from '@molecules/DotsDropdown';
import {
  DetailsWrapper,
  ExecutionTimeItemColumn,
  ItemColumn,
  ItemRow,
  ItemWrapper,
  RowsWrapper,
  StyledMetricItem,
} from '@molecules/EntityGrid.styled';
import {LabelsList} from '@molecules/LabelsList';
import {MetricsBarChart} from '@molecules/MetricsBarChart';

import {Colors} from '@styles/Colors';

import {formatDuration} from '@utils/formatDate';

import {EntityGridItemExecutionTime} from './EntityGridItemExecutionTime';

export interface Item {
  type?: string;
  name: string;
  labels?: Record<string, string>;
}

interface Metrics {
  executions: ExecutionMetrics[];
  failedExecutions: number;
  passFailRatio: number;
  executionDurationP50ms: number;
}

interface EntityGridItemPureProps {
  item: Item;
  latestExecution?: TestSuiteExecution | Execution;
  metrics?: Metrics;
  onClick: (item: Item) => void;
  onAbort: (item: Item) => void;
  dataTest: string;
}

const EntityGridItemTestIcon: FC<{item: Item}> = memo(({item}) => {
  const icon = useExecutorIcon(item);
  return item.type ? <ExecutorIcon type={icon} /> : null;
});

const isRunningStatus = (status: string) => ['running', 'queued'].includes(status);

export const EntityGridItemPure = memo(
  forwardRef<HTMLDivElement, EntityGridItemPureProps>((props, ref) => {
    const {item, latestExecution, onClick, onAbort, dataTest, metrics} = props;

    const status =
      (latestExecution as Execution)?.executionResult?.status ||
      (latestExecution as TestSuiteExecution)?.status ||
      'pending';
    const executions = metrics?.executions;
    const isRunning = isRunningStatus(status) || executions?.some(execution => isRunningStatus(execution.status));

    const click = useCallback(() => {
      onClick(item);
    }, [onClick, item]);

    const abort = useCallback(
      (event: MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation();
        onAbort(item);
      },
      [onAbort, item]
    );

    return (
      <ItemWrapper onClick={click} ref={ref} data-test={dataTest}>
        <DetailsWrapper>
          <ItemRow $flex={0}>
            <ItemColumn $isStretch>
              <StatusIcon status={status} />
              <EntityGridItemTestIcon item={item} />
              <div style={{overflow: 'hidden', flex: 1, display: 'flex'}}>
                <Text className="regular big" ellipsis title={item.name}>
                  {item.name}
                </Text>
              </div>
            </ItemColumn>
            <ExecutionTimeItemColumn>
              <EntityGridItemExecutionTime time={latestExecution?.startTime} />
              {isRunning ? (
                <DotsDropdown
                  placement="bottomRight"
                  items={[{key: 1, label: <span onClick={abort}>Abort all executions</span>}]}
                />
              ) : null}
            </ExecutionTimeItemColumn>
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
