import {useContext, useEffect, useState} from 'react';

import {Table, Tabs} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';

import axios from 'axios';

import {useAppSelector} from '@redux/hooks';
import {selectRedirectTarget} from '@redux/reducers/configSlice';

import {TestRunnerIcon} from '@atoms';

import {Button, Text} from '@custom-antd';

import {CLICommands, LabelsList} from '@molecules';

import Colors from '@styles/Colors';

import {EntityExecutionsContext, MainContext} from '@contexts';

import EmptyExecutionsListContent from './EmptyExecutionsListContent';
import {StyledContainer, StyledPageHeader, TabsWrapper} from './EntityExecutionsContent.styled';
import Settings from './Settings';
import SummaryGrid from './SummaryGrid';
import TableRow from './TableRow';

const EntityExecutionsContent: React.FC = () => {
  const {
    entity,
    entityDetails,
    executionsList,
    onRowSelect,
    defaultStackRoute,
    selectedRow,
    currentPage,
    setCurrentPage,
  } = useContext(EntityExecutionsContext);
  const {navigate} = useContext(MainContext);

  const {isSettingsTabConfig} = useAppSelector(selectRedirectTarget);

  const [activeTabKey, setActiveTabKey] = useState('1');

  useEffect(() => {
    if (isSettingsTabConfig) {
      setActiveTabKey('Settings');
    }
  }, [isSettingsTabConfig]);

  const name = entityDetails?.name;
  const description = entityDetails?.description;
  const labels = entityDetails?.labels;
  const type = entityDetails?.type;

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

      setTimeout(() => {
        onRowSelect(result?.data, true);
      }, 1500);
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

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: selectedRow ? [selectedRow.id] : [],
    columnWidth: 0,
    renderCell: () => null,
  };

  return (
    <StyledContainer>
      <StyledPageHeader
        onBack={() => navigate(defaultStackRoute)}
        title={name || 'Loading...'}
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
      <SummaryGrid />
      <TabsWrapper activeKey={activeTabKey} onChange={setActiveTabKey}>
        <Tabs.TabPane tab="Recent executions" key="1">
          {isEmptyExecutions ? (
            <EmptyExecutionsListContent triggerRun={onRunButtonClick} />
          ) : (
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
              rowSelection={{...rowSelection}}
              rowKey={record => {
                return record.id;
              }}
              pagination={{
                pageSize: 10,
                current: currentPage,
                onChange: current => {
                  setCurrentPage(current);
                },
                showSizeChanger: false,
              }}
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="CLI Commands" key="CLICommands">
          <CLICommands name={name} bg={Colors.slate800} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Settings" key="Settings">
          <Settings />
        </Tabs.TabPane>
      </TabsWrapper>
    </StyledContainer>
  );
};

export default EntityExecutionsContent;
