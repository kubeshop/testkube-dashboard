import {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectedSelectedExecutionInfo, setSelectedExecutionInfo} from '@redux/reducers/executionsSlice';

import {ExecutionResultsOutputs, TestDetailsDrawerHeader} from '@molecules';

import {useGetScriptExecutionByIdQuery} from '@services/executions';

const ExecutionsInfoPanel = (props: any) => {
  const {selectedRecord} = props;

  const dispatch = useAppDispatch();

  const selectedExecutionInfo = useAppSelector(selectedSelectedExecutionInfo);

  const {data, isLoading, isFetching, refetch} = useGetScriptExecutionByIdQuery(selectedRecord.id);

  useEffect(() => {
    dispatch(setSelectedExecutionInfo(data));
  }, [data]);

  useEffect(() => {
    refetch();
  }, [selectedRecord]);

  if (!selectedExecutionInfo || isLoading || isFetching) {
    return <div />;
  }

  return (
    <div style={{padding: '0px 40px'}}>
      <TestDetailsDrawerHeader {...selectedExecutionInfo} />
      {/* <TestDetailsDrawerPerformanceSection showOverView bordered testDescriptionData={data} /> */}
      <ExecutionResultsOutputs {...selectedExecutionInfo} />
    </div>
  );
};

export default ExecutionsInfoPanel;
