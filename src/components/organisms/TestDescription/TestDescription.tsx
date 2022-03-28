import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {Drawer} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectedTestId, updateSelectedTestId} from '@redux/reducers/executionsSlice';

import {Spinner, TKubeDivider} from '@atoms';

import {ExecutionResultsOutputs, TestDetailsDrawerHeader} from '@molecules';

import {useGetScriptExecutionByIdQuery} from '@src/services/executions';

import {Container} from './TestDescription.styled';

const TestDescription = () => {
  const testId = useAppSelector(selectedTestId);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const {data, error, isLoading} = useGetScriptExecutionByIdQuery(testId, {
    skip: !testId,
    pollingInterval: 500,
  });

  const onClose = () => {
    setVisible(false);
  };

  React.useEffect(() => {
    if (testId) {
      setVisible(!visible);
    }
  }, [testId]);

  const afterVisibleChange = () => (!visible ? dispatch(updateSelectedTestId(undefined)) : null);

  return (
    <>
      {testId && data && (
        <Drawer
          afterVisibleChange={afterVisibleChange}
          width="630px"
          onClose={onClose}
          visible={visible}
          bodyStyle={{padding: 0, display: 'flex', flexDirection: 'column', background: 'var(--color-dark-quinary)'}}
        >
          <Container>
            {/* {error && <Typography variant="secondary">Something went wrong...</Typography>} */}
            {isLoading && <Spinner size="large" center />}
            <>
              <TestDetailsDrawerHeader data={data} />
              <TKubeDivider />
              {/* <TestDetailsDrawerPerformanceSection showOverView bordered testDescriptionData={data} /> */}
              <ExecutionResultsOutputs data={data} />
            </>
          </Container>
        </Drawer>
      )}
    </>
  );
};

export default TestDescription;
