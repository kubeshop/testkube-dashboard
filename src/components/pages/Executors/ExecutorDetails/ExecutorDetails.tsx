import {useContext, useEffect, useState} from 'react';

import {Tabs} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, setCurrentExecutor} from '@redux/reducers/executorsSlice';

// import {Button} from '@custom-antd';
import {useGetExecutorDetailsQuery} from '@services/executors';

import {MainContext} from '@contexts';

import {StyledContainer, StyledPageHeader} from './ExecutorDetails.styled';
import ExecutorSettings from './ExecutorSettings';

const ExecutorDetails = () => {
  const {navigate, location, dispatch} = useContext(MainContext);

  const currentExecutorDetails = useAppSelector(selectCurrentExecutor);

  const name = location.pathname.split('/')[2];

  const [activeTabKey, setActiveTabKey] = useState('Settings');

  const {data: executorDetails, refetch} = useGetExecutorDetailsQuery(name);

  const isPageDisabled = !name;

  useEffect(() => {
    if (executorDetails) {
      dispatch(setCurrentExecutor(executorDetails));
    }
  }, [executorDetails]);

  useEffect(() => {
    refetch();
  }, [location]);

  return (
    <StyledContainer>
      <StyledPageHeader
        onBack={() => navigate('/executors')}
        title={name}
        // extra={[
        //   <Button key="create-test-button" type="primary">
        //     Create a new test
        //   </Button>,
        // ]}
        className="testkube-pageheader"
      />
      <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} destroyInactiveTabPane>
        <Tabs.TabPane tab="Settings" key="Settings" disabled={isPageDisabled}>
          {currentExecutorDetails ? <ExecutorSettings /> : null}
        </Tabs.TabPane>
      </Tabs>
    </StyledContainer>
  );
};

export default ExecutorDetails;
