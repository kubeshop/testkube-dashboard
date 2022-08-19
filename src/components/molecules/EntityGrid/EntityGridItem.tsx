import {useContext, useRef} from 'react';

import {format} from 'date-fns';

import {StatusIcon, TestRunnerIcon} from '@atoms';

import {Text} from '@custom-antd';

import {LabelsList, MetricsBarChart} from '@molecules';

import {EntityListContext} from '@organisms/EntityList/EntityListContainer/EntityListContainer';

import useInViewport from '@hooks/useInViewport';

import {executionDateFormat} from '@utils/strings';

import Colors from '@styles/Colors';

import {DetailsWrapper, ItemColumn, ItemRow, ItemWrapper} from './EntityGrid.styled';

const EntityGridItem: React.FC<any> = props => {
  const {item, onClick} = props;
  const {dataItem, latestExecution} = item;
  const {useGetMetrics} = useContext(EntityListContext);

  const status = latestExecution ? latestExecution?.executionResult?.status || latestExecution?.status : 'pending';
  const startDate = latestExecution?.startTime ? format(new Date(latestExecution?.startTime), executionDateFormat) : '';

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics} = useGetMetrics({id: dataItem.name, limit: 13}, {skip: !isInViewport});

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
          {/* <ItemColumn /> */}
        </ItemRow>
        <ItemRow $flex={1}>
          <MetricsBarChart
            data={metrics?.executions.filter((execItem: any) => execItem.duration_ms || execItem.status === 'running')}
            chartHeight={38}
            barWidth={6}
          />
        </ItemRow>
      </DetailsWrapper>
    </ItemWrapper>
  );
};

export default EntityGridItem;
