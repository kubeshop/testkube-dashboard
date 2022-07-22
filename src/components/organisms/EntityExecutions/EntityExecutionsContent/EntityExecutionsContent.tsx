import {useContext, useMemo} from 'react';

import {Table, Tabs} from 'antd';

import axios from 'axios';

import {Button, Text, Title} from '@custom-antd';

import {LabelsList} from '@molecules';

import Colors from '@styles/Colors';

import {TestRunnerIcon} from '@src/components/atoms';

import {EntityExecutionsContext} from '../EntityExecutionsContainer/EntityExecutionsContainer';
import {StyledPageHeader, SummaryGridItem, SummaryGridWrapper} from './EntityExecutionsContent.styled';
import TableRow from './TableRow';

const EntityExecutionsContent: React.FC = () => {
  const {entity, entityDetails, executionsList, onRowSelect} = useContext(EntityExecutionsContext);

  const name = entityDetails?.name;
  const description = entityDetails?.description;
  const labels = entityDetails?.labels;
  const type = entityDetails?.type;

  const failedExecutionsListNumber = useMemo(() => {
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
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <StyledPageHeader
        onBack={() => window.history.back()}
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
      <SummaryGridWrapper>
        <SummaryGridItem>
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
        </SummaryGridItem>
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
      <Tabs defaultActiveKey="1" style={{overflow: 'hidden', height: '100%'}}>
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
                  onRowSelect(record);
                },
              })}
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">
          dasdsada
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default EntityExecutionsContent;
