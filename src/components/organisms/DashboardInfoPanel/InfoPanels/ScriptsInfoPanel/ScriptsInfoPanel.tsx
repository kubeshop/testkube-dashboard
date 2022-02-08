import {Script} from '@models/scripts';

import {useAppDispatch} from '@redux/hooks';

import {CLICommands} from '@molecules';

import {useGetScriptExecutionsByIdQuery} from '@services/scripts';

import {ScriptExecutionSummaryBlock} from './ScriptsInfoPanelBlocks';

type ScriptsInfoPanelProps = {
  selectedRecord: Script;
};

const ScriptsInfoPanel: React.FC<ScriptsInfoPanelProps> = props => {
  const {selectedRecord} = props;
  const {name, type, created, content} = selectedRecord;

  const dispatch = useAppDispatch();

  const {data: scriptExecutionData, isLoading, isFetching} = useGetScriptExecutionsByIdQuery(name);

  const isQueryLoading = isLoading || isFetching;

  const scriptCLICommands = [
    {command: `kubectl testkube scripts start ${name}`, label: 'Start script'},
    {command: `kubectl testkube scripts delete ${name}`, label: 'Delete script'},
  ];

  return (
    <>
      {scriptExecutionData && !isQueryLoading ? (
        <ScriptExecutionSummaryBlock
          total={scriptExecutionData.filtered.results}
          passed={scriptExecutionData.filtered.passed}
          failed={scriptExecutionData.filtered.failed}
          scriptName={selectedRecord.name}
        />
      ) : null}
      <CLICommands cliCommands={scriptCLICommands} />
    </>
  );
};

export default ScriptsInfoPanel;
