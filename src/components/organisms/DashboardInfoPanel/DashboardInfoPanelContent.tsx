/* eslint-disable unused-imports/no-unused-imports-ts */
import {useContext, useEffect, useState} from 'react';

import {Tabs} from 'antd';
import {ColumnsType, TableRowSelection} from 'antd/lib/table/interface';

import axios from 'axios';

import {DashboardBlueprintType} from '@models/dashboard';

import {useAppSelector} from '@redux/hooks';
import {clearRunTarget, clearTargetTestExecutionId, selectRedirectTarget} from '@redux/reducers/configSlice';

import {Skeleton} from '@custom-antd';

import {CLICommands, ExecutionTableRow, InfoPanelHeader} from '@molecules';

import useElementSize from '@hooks/useElementSize';

import {PollingIntervals} from '@utils/numbers';

import {useGetTestSuiteExecutionsByTestIdQuery} from '@services/testSuiteExecutions';
import {useGetTestExecutionsByIdQuery} from '@services/tests';

import {DashboardInfoPanelContext, MainContext} from '@contexts';

import {DashboardContext} from '../DashboardContainer/DashboardContainer';
import {
  StyledAntTabs,
  StyledDashboardInfoPanelContent,
  StyledInfoPanelSection,
  StyledTable,
} from './DashboardInfoPanel.styled';

const {TabPane} = Tabs;

const executionsColumns: ColumnsType<any> = [
  {
    render: (data: any) => {
      return <ExecutionTableRow {...data} />;
    },
  },
];

// The reason I've done this is here https://github.com/reduxjs/redux-toolkit/issues/1970.
// Let's discuss if you have anything to add, maybe an idea how to rework it.
const TestSuiteExecutionsDataLayer = () => {
  const {selectedRecord} = useContext(DashboardContext);
  const {onDataChange} = useContext(DashboardInfoPanelContext);

  const {name} = selectedRecord;

  const {data, isLoading, isFetching, refetch} = useGetTestSuiteExecutionsByTestIdQuery(
    {id: name},
    {
      pollingInterval: PollingIntervals.everySecond,
    }
  );

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const TestExecutionsDataLayer = () => {
  const {selectedRecord} = useContext(DashboardContext);
  const {onDataChange} = useContext(DashboardInfoPanelContext);

  const {name} = selectedRecord;

  const {data, isLoading, isFetching, refetch} = useGetTestExecutionsByIdQuery(
    {name},
    {
      pollingInterval: PollingIntervals.everySecond,
    }
  );

  useEffect(() => {
    onDataChange({data, isLoading, isFetching, refetch});
  }, [data, isLoading, isFetching]);

  return <></>;
};

const dataLayers: {[key in DashboardBlueprintType]: any} = {
  'test-suites': <TestSuiteExecutionsDataLayer />,
  tests: <TestExecutionsDataLayer />,
};

const DashboardInfoPanelContent = () => {
  const {
    selectedRecord,
    testTypeFieldName,
    setSecondLevelOpenState,
    setSelectedExecution,
    dashboardGradient,
    selectedExecution,
    entityType,
  } = useContext(DashboardContext);

  const {dispatch} = useContext(MainContext);

  const {targetTestExecutionId, runTarget} = useAppSelector(selectRedirectTarget);

  const [ref, size] = useElementSize();

  const [infoPanelProps, setInfoPanelProps] = useState<any>({
    data: null,
    isLoading: false,
    isFetching: false,
    refetch: () => {},
  });
  const [currentPage, setCurrentPage] = useState(1);

  const infoPanelHeaderProps = {
    ...(selectedRecord?.name ? {title: selectedRecord?.name} : {}),
    ...(testTypeFieldName && selectedRecord ? {testType: selectedRecord[testTypeFieldName]} : {}),
    ...(selectedRecord?.labels ? {labels: selectedRecord?.labels} : {}),
    ...(selectedRecord?.description ? {description: selectedRecord?.description} : {}),
    ...(infoPanelProps.isLoading || infoPanelProps.isFetching ? {isLoading: true} : {}),
  };

  const onDataChange = (data: any) => {
    setInfoPanelProps(data);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: [selectedExecution?.id],
    columnWidth: 0,
    renderCell: () => null,
  };

  const onRunButtonClick = async () => {
    try {
      const result = await axios(`/${entityType}/${selectedRecord?.name}/executions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          namespace: 'testkube',
        }),
      });

      if (result) {
        infoPanelProps?.refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onRowClick = (record: any) => {
    setSecondLevelOpenState(true);
    setSelectedExecution(record);
  };

  useEffect(() => {
    setSecondLevelOpenState(false);
    setSelectedExecution(null);
  }, [selectedRecord]);

  useEffect(() => {
    infoPanelProps?.refetch();
  }, [entityType]);

  useEffect(() => {
    if (infoPanelProps.data?.results || infoPanelProps.data?.results?.length) {
      if (targetTestExecutionId) {
        const targetTestExecution = infoPanelProps.data?.results.filter((result: any, index: number) => {
          return result.id === targetTestExecutionId;
        });

        const targetExecutionArrayIndex = infoPanelProps.data?.results.indexOf(targetTestExecution[0]) + 1;

        if (targetTestExecution.length) {
          setCurrentPage(Math.ceil(targetExecutionArrayIndex / 10));
          onRowClick(targetTestExecution[0]);
          dispatch(clearTargetTestExecutionId());
        }
      }
    }
  }, [infoPanelProps?.data, targetTestExecutionId]);

  useEffect(() => {
    if (runTarget) {
      onRunButtonClick();
      dispatch(clearRunTarget());
    }
  }, [runTarget]);

  return (
    <StyledDashboardInfoPanelContent ref={ref}>
      <DashboardInfoPanelContext.Provider value={{onDataChange, size}}>
        {dataLayers[entityType]}
        <InfoPanelHeader {...infoPanelHeaderProps} onRunButtonClick={onRunButtonClick} />
        <StyledAntTabs defaultActiveKey="1">
          <TabPane tab="Executions" key="ExecutionsPane">
            <StyledInfoPanelSection>
              <Skeleton
                paragraph={{rows: 5, width: '100%'}}
                loading={infoPanelProps.isLoading}
                title={false}
                additionalStyles={{
                  lineHeight: 40,
                }}
              >
                <StyledTable
                  dataSource={infoPanelProps.data?.results}
                  showHeader={false}
                  columns={executionsColumns}
                  gradient={dashboardGradient}
                  pagination={{
                    hideOnSinglePage: true,
                    showSizeChanger: false,
                    current: currentPage,
                    onChange: page => {
                      setCurrentPage(page);
                    },
                  }}
                  rowSelection={rowSelection}
                  rowKey={(record: any) => {
                    return record.id;
                  }}
                  onRow={(record: any) => ({
                    onClick: () => {
                      onRowClick(record);
                    },
                  })}
                />
              </Skeleton>
            </StyledInfoPanelSection>
          </TabPane>
          {/* <TabPane tab="CLI Commands" key="CLICommandsPane">
            <CLICommands />
          </TabPane> */}
        </StyledAntTabs>
      </DashboardInfoPanelContext.Provider>
    </StyledDashboardInfoPanelContent>
  );
};

export default DashboardInfoPanelContent;
