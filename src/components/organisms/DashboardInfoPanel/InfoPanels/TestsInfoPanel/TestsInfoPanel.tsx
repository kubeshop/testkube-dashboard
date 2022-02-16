import {Script} from '@models/tests';

import {useAppDispatch} from '@redux/hooks';

import {CLICommands} from '@molecules';

import {useGetTestExecutionsByIdQuery} from '@services/tests';

import {TestExecutionSummaryBlock} from './TestsInfoPanelBlocks';

type TestsInfoPanelProps = {
  selectedRecord: Script;
};

const TestsInfoPanel: React.FC<TestsInfoPanelProps> = props => {
  const {selectedRecord} = props;
  const {name, type, created, content} = selectedRecord;

  const dispatch = useAppDispatch();

  const {data: testExecutionData, isLoading, isFetching} = useGetTestExecutionsByIdQuery(name);

  const isQueryLoading = isLoading || isFetching;

  const scriptCLICommands = [
    {command: `kubectl testkube scripts start ${name}`, label: 'Start script'},
    {command: `kubectl testkube scripts delete ${name}`, label: 'Delete script'},
  ];

  return (
    <>
      {testExecutionData && !isQueryLoading ? (
        <TestExecutionSummaryBlock
          total={testExecutionData.filtered.results}
          passed={testExecutionData.filtered.passed}
          failed={testExecutionData.filtered.failed}
          scriptName={selectedRecord.name}
        />
      ) : null}
      <CLICommands cliCommands={scriptCLICommands} />
    </>
  );
};

export default TestsInfoPanel;
