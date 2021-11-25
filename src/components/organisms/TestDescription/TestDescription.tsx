/* eslint react/destructuring-assignment: 0 */
import React, {useState} from 'react';
import {Col} from 'antd';

import {Spinner} from '@atoms';
import {TestDetailsDrawerHeader, ExecutionResultsOutputs} from '@molecules';

import {selectedTestId, updateSelectedTestId} from '@redux/reducers/testsListSlice';
import {useGetTestByIdQuery} from '@src/services/tests';
import {useAppSelector} from '@redux/hooks';
import {useDispatch} from 'react-redux';

const TestDescription = () => {
  const testId = useAppSelector(selectedTestId);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const {data, error, isLoading} = useGetTestByIdQuery(testId, {
    skip: !testId,
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
        <Col>
          {/* {error && <Typography variant="secondary">Something went wrong...</Typography>} */}
          {isLoading && <Spinner size="large" center />}
          <>
            <TestDetailsDrawerHeader data={data} />
            {/* <TestDetailsDrawerPerformanceSection showOverView bordered testDescriptionData={data} /> */}
            <ExecutionResultsOutputs data={data} />
          </>
        </Col>
      )}
    </>
  );
};

export default TestDescription;
