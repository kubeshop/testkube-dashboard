import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectSelectedTestExecution} from '@redux/reducers/testExecutionsSlice';

import {TestDetailsDrawerHeader} from '@molecules';
import TestExecutionResultsOutputs from '@molecules/ExecutionResultsOutputs/TestExecutionResultsOutputs';

const TestExecutionsInfoPanel = (props: any) => {
  const {selectedRecord} = props;

  const dispatch = useAppDispatch();

  const selectedTestExecutionInfo = useAppSelector(selectSelectedTestExecution);

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

export default TestExecutionsInfoPanel;
