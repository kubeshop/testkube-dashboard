/* eslint react/destructuring-assignment: 0 */
import React, {useState} from 'react';
import {Drawer} from 'antd';

import {Spinner} from '@atoms';
import {TestDetailsDrawerHeader, TestDetailsDrawerPerformanceSection, ExecutionResultsOutputs} from '@molecules';

import {selectedTestId} from '@redux/reducers/testsListSlice';
import {useGetTestByIdQuery} from '@src/services/tests';
import {useAppSelector} from '@redux/hooks';

const TestDescription = () => {
  const testId = useAppSelector(selectedTestId);
  const [visible, setVisible] = useState(false);
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

  return (
    <>
      {testId && data && (
        <Drawer
          width="630px"
          onClose={onClose}
          visible={visible}
          bodyStyle={{display: 'flex', flexDirection: 'column', background: 'var(--color-dark-quinary)'}}
        >
          {/* {error && <Typography variant="secondary">Something went wrong...</Typography>} */}
          {isLoading && <Spinner size="large" center />}
          <>
            <TestDetailsDrawerHeader data={data} />
            <TestDetailsDrawerPerformanceSection showOverView bordered testDescriptionData={data} />
            <ExecutionResultsOutputs data={data} />
          </>
        </Drawer>
      )}
    </>
  );
};

export default TestDescription;
