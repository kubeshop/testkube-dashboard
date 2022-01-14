import {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '@redux/hooks';

import {ExecutionResultsOutputs, TestDetailsDrawerHeader} from '@molecules';

// import {useGetScriptExecutionByIdQuery} from '@services/executions';
import {selectSelectedTestExecution} from '@src/redux/reducers/testExecutionsSlice';

const TestExecutionsInfoPanel = (props: any) => {
  const {selectedRecord} = props;

  const dispatch = useAppDispatch();

  const selectedTestExecutionInfo = useAppSelector(selectSelectedTestExecution);

  // const {data, isLoading, isFetching, refetch} = useGetScriptExecutionByIdQuery(selectedRecord.id);

  useEffect(() => {
    // refetch();
  }, [selectedRecord]);

  if (!selectedTestExecutionInfo) {
    return <div />;
  }

  console.log('selectedTestExecutionInfo: ', selectedTestExecutionInfo);

  return (
    <div style={{padding: '0px 40px'}}>
      <TestDetailsDrawerHeader {...selectedTestExecutionInfo} />
      {/* <TestDetailsDrawerPerformanceSection showOverView bordered testDescriptionData={data} /> */}
      <ExecutionResultsOutputs {...selectedTestExecutionInfo} />
    </div>
  );
};

export default TestExecutionsInfoPanel;
