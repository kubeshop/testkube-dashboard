import {useContext, useMemo} from 'react';

import {Table, Tabs} from 'antd';

import axios from 'axios';

import {TestRunnerIcon} from '@atoms';

import {Button, Text, Title} from '@custom-antd';

import {LabelsList} from '@molecules';

import Colors from '@styles/Colors';

import {EntityExecutionsContext, MainContext} from '@contexts';

import {StyledPageHeader, SummaryGridItem, SummaryGridWrapper} from './EntityExecutionsContent.styled';
import Settings from './Settings';
import TableRow from './TableRow';

const EntityExecutionsContent: React.FC = () => {
  const {entity, entityDetails, executionsList, onRowSelect, isRowSelected, defaultStackRoute} =
    useContext(EntityExecutionsContext);
  const {navigate} = useContext(MainContext);

  const name = entityDetails?.name;
  const description = entityDetails?.description;
  const labels = entityDetails?.labels;
  const type = entityDetails?.type;

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

  const onRunButtonClick = async () => {
    try {
      const result = await axios(`/${entity}/${name}/executions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          namespace: 'testkube',
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const isEmptyExecutions = !executionsList?.results || !executionsList?.results.length;

  const avatar = type
    ? {
        avatar: {icon: <TestRunnerIcon icon={type} noWidth />},
      }
    : {};

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        overflowY: 'scroll',
        height: '100%',
        flex: 1,
        padding: 40,
      }}
    >
      <StyledPageHeader
        onBack={() => navigate(defaultStackRoute)}
        title={name}
        subTitle={labels ? <LabelsList labels={entityDetails?.labels} /> : ''}
        extra={[
          <Button key="1" type="primary" onClick={onRunButtonClick}>
            Run now
          </Button>,
        ]}
        className="testkube-pageheader"
        {...avatar}
      >
        {description ? (
          <Text color={Colors.slate400} className="middle">
            {description}
          </Text>
        ) : null}
      </StyledPageHeader>
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
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Recent executions" key="1">
          {isEmptyExecutions ? null : (
            <Table
              showHeader={false}
              dataSource={executionsList?.results}
              columns={[
                {
                  render: data => {
                    return <TableRow data={data} />;
                  },
                },
              ]}
              onRow={(record: any) => ({
                onClick: () => {
                  onRowSelect(record, true);
                },
              })}
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Settings" key="Settings">
          <Settings />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default EntityExecutionsContent;
