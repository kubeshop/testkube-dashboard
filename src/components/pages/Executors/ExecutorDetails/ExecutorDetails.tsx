import {useContext, useEffect, useState} from 'react';

import {Tabs} from 'antd';

import {Button} from '@custom-antd';

import {useGetExecutorDetailsQuery} from '@services/executors';

import {MainContext} from '@contexts';

import {setCurrentExecutor} from '@src/redux/reducers/executorsSlice';

import {StyledContainer, StyledPageHeader} from './ExecutorDetails.styled';
import ExecutorSettings from './ExecutorSettings';

const ExecutorDetails = () => {
  const {navigate, location, dispatch} = useContext(MainContext);

  const name = location.pathname.split('/')[2];

  const [activeTabKey, setActiveTabKey] = useState('Settings');

  const {data: executorDetails} = useGetExecutorDetailsQuery(name);

  useEffect(() => {
    if (executorDetails) {
      dispatch(setCurrentExecutor(executorDetails));
    }
  }, [executorDetails]);

  const isPageDisabled = !name;

  return (
    <StyledContainer>
      <StyledPageHeader
        onBack={() => navigate('/executors')}
        title={name}
        extra={[
          <Button key="create-test-button" type="primary">
            Create a new test
          </Button>,
        ]}
        className="testkube-pageheader"
      />
      <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} destroyInactiveTabPane>
        <Tabs.TabPane tab="Settings" key="Settings" disabled={isPageDisabled}>
          <ExecutorSettings />
        </Tabs.TabPane>
      </Tabs>
    </StyledContainer>
  );
};

export default ExecutorDetails;
