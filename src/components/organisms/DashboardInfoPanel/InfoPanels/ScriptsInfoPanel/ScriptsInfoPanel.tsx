import {useAppDispatch} from '@redux/hooks';

import {useGetScriptExecutionsByIdQuery} from '@services/scripts';

import {ScriptExecutionsSummaryBlock} from './ScriptsInfoPanelBlocks';

const ScriptsInfoPanel = (props: any) => {
  const {selectedRecord} = props;

  const dispatch = useAppDispatch();

  const {data: scriptExecutionsData, isLoading, isFetching} = useGetScriptExecutionsByIdQuery(selectedRecord.name);

  if (isLoading || isFetching) {
    return <div />;
  }

  return (
    <>
      {scriptExecutionsData && (
        <ScriptExecutionsSummaryBlock
          total={scriptExecutionsData.filtered.results}
          passed={scriptExecutionsData.filtered.passed}
          failed={scriptExecutionsData.filtered.failed}
          scriptName={selectedRecord.name}
        />
      )}
    </>
  );
};

export default ScriptsInfoPanel;
