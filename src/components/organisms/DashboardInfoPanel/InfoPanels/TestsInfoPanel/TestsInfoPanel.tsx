/* eslint-disable unused-imports/no-unused-imports-ts */
import {Test} from '@models/tests';

import {useAppDispatch} from '@redux/hooks';

import {CLICommands} from '@molecules';

import {useGetTestExecutionsByIdQuery} from '@services/tests';

import {TestExecutionSummaryBlock} from './TestsInfoPanelBlocks';

type TestsInfoPanelProps = {
  selectedRecord: Test;
};

const TestsInfoPanel: React.FC<TestsInfoPanelProps> = props => {
  // const {selectedRecord} = props;
  // const {name, type, created, content} = selectedRecord;

  // const dispatch = useAppDispatch();

  // const {data: testExecutionData, isLoading, isFetching} = useGetTestExecutionsByIdQuery(name);

  // const isQueryLoading = isLoading || isFetching;

  // const testsCLICommands = [
  //   {command: `kubectl testkube test run ${name}`, label: 'Start test'},
  //   {command: `kubectl testkube test delete ${name}`, label: 'Delete test'},
  // ];

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
      {/* <CLICommands cliCommands={testsCLICommands} /> */}
    </>
  );
};

export default TestsInfoPanel;
