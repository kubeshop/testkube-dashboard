/* eslint-disable unused-imports/no-unused-imports-ts */
import {useContext, useEffect, useState} from 'react';

import {Space, Table, Tabs} from 'antd';
import {ColumnsType, TableRowSelection} from 'antd/lib/table/interface';

import {Test} from '@models/tests';

import {CLICommands, ExecutionTableRow} from '@molecules';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {useGetTestExecutionsByIdQuery} from '@services/tests';

import {
  StyledAntTabs,
  StyledInfoPanelSection,
  StyledInfoPanelSectionTitle,
  StyledTable,
} from '../../DashboardInfoPanel.styled';
import {TestExecutionSummaryBlock} from './TestsInfoPanelBlocks';

const {TabPane} = Tabs;

type TestsInfoPanelProps = {
  selectedRecord: Test;
};

const executionsColumns: ColumnsType<any> = [
  {
    render: (data: any) => {
      return <ExecutionTableRow {...data} />;
    },
  },
];

const TestExecutions = () => {
  const {dashboardGradient, selectedRecord, setSecondLevelOpenState, setSelectedExecution, selectedExecution} =
    useContext(DashboardContext);

  const {name} = selectedRecord;

  const {data, isLoading} = useGetTestExecutionsByIdQuery(name, {pollingInterval: 5_000});

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: [selectedExecution?.id],
    columnWidth: 0,
    renderCell: () => null,
  };

  useEffect(() => {
    setSecondLevelOpenState(false);
    setSelectedExecution(null);
  }, [selectedRecord]);

  return (
    <StyledInfoPanelSection>
      <StyledTable
        loading={isLoading}
        dataSource={data?.results}
        showHeader={false}
        columns={executionsColumns}
        gradient={dashboardGradient}
        pagination={{hideOnSinglePage: true}}
        rowSelection={rowSelection}
        rowKey={(record: any) => {
          return record.id;
        }}
        onRow={(record: any) => ({
          onClick: () => {
            setSecondLevelOpenState(true);
            setSelectedExecution(record);
          },
        })}
      />
    </StyledInfoPanelSection>
  );
};

const TestsInfoPanel: React.FC<TestsInfoPanelProps> = props => {
  const {selectedRecord} = props;
  const {name, type, created, content} = selectedRecord;

  // const dispatch = useAppDispatch();

  // const {data: testExecutionData, isLoading, isFetching} = useGetTestExecutionsByIdQuery(name);

  // const isQueryLoading = isLoading || isFetching;

  const testsCLICommands = [
    {command: `kubectl testkube test run ${name}`, label: 'Start test'},
    {command: `kubectl testkube test delete ${name}`, label: 'Delete test'},
  ];

  return (
    <>
      {/* {testExecutionData && !isQueryLoading ? (
        <TestExecutionSummaryBlock
          total={testExecutionData.filtered.results}
          passed={testExecutionData.filtered.passed}
          failed={testExecutionData.filtered.failed}
          testName={selectedRecord.name}
        />
      ) : null} */}
      <StyledAntTabs defaultActiveKey="1">
        <TabPane tab="Executions" key="ExecutionsPane">
          <TestExecutions />
        </TabPane>
        <TabPane tab="CLI Commands" key="CLICommandsPane">
          <CLICommands cliCommands={testsCLICommands} />
        </TabPane>
        {/* <TabPane tab="Definition" key="ExecutionDefinitionPane">
          <ExecutionDefinition />
        </TabPane> */}
      </StyledAntTabs>
    </>
  );
};

export default TestsInfoPanel;
