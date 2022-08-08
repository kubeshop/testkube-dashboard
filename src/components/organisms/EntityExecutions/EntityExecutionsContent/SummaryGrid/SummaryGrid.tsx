import {useContext, useMemo} from 'react';

import {Text, Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {EntityExecutionsContext} from '@contexts';

import {SummaryGridItem, SummaryGridWrapper} from './SummaryGrid.styled';

const SummaryGrid = () => {
  const {executionsList, isRowSelected} = useContext(EntityExecutionsContext);
  const failedExecutionsListNumber = useMemo(() => {
    if (!executionsList?.results.length) {
      return '-';
    }

    let number = 0;

    executionsList?.results.forEach((item: any) => {
      if (item.status === 'failed') {
        number += 1;
      }
    });

    return number;
  }, [executionsList?.results]);

  return (
    <SummaryGridWrapper $gridCols={isRowSelected ? 2 : 5}>
      {/* <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            reliability
          </Text>
          <Title level={3}>TBD</Title>
        </SummaryGridItem>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            execution duration (p50)
          </Text>
          <Title level={3}>TBD</Title>
        </SummaryGridItem>
        <SummaryGridItem>
          <Text className="uppercase middle" color={Colors.slate500}>
            execution duration (p95)
          </Text>
          <Title level={3}>TBD</Title>
        </SummaryGridItem> */}
      <SummaryGridItem>
        <Text className="uppercase middle" color={Colors.slate500}>
          failed executions
        </Text>
        <Title level={3}>{failedExecutionsListNumber}</Title>
      </SummaryGridItem>
      <SummaryGridItem>
        <Text className="uppercase middle" color={Colors.slate500}>
          total executions
        </Text>
        <Title level={3}>{executionsList?.results.length || '-'}</Title>
      </SummaryGridItem>
    </SummaryGridWrapper>
  );
};

export default SummaryGrid;
