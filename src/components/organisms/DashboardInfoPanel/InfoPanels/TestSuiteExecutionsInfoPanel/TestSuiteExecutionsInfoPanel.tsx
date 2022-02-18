import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectSelectedTestSuiteExecution} from '@redux/reducers/testSuiteExecutionsSlice';

import {TestDetailsDrawerHeader} from '@molecules';
import TestExecutionResultsOutputs from '@molecules/ExecutionResultsOutputs/TestExecutionResultsOutputs';

const TestSuiteExecutionsInfoPanel = (props: any) => {
  const {selectedRecord} = props;

  const dispatch = useAppDispatch();

  const selectedTestExecutionInfo = useAppSelector(selectSelectedTestSuiteExecution);

  if (!selectedTestExecutionInfo) {
    return <div />;
  }

  return (
    <div style={{padding: '0px 40px'}}>
      <TestDetailsDrawerHeader {...selectedTestExecutionInfo} />
      {/* <TestDetailsDrawerPerformanceSection showOverView bordered testDescriptionData={data} /> */}
      <TestExecutionResultsOutputs {...selectedTestExecutionInfo} />
    </div>
  );
};

export default TestSuiteExecutionsInfoPanel;
