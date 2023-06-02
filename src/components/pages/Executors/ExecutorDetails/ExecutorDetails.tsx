import {useContext, useEffect, useState} from 'react';

import {Tabs} from 'antd';

import {DashboardContext, MainContext} from '@contexts';

import useLocation from '@hooks/useLocation';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, setCurrentExecutor} from '@redux/reducers/executorsSlice';

import {useGetExecutorDetailsQuery} from '@services/executors';

import Head from '@src/Head';

import {safeRefetch} from '@utils/fetchUtils';

import {StyledContainer, StyledPageHeader} from './ExecutorDetails.styled';
import ExecutorSettings from './ExecutorSettings';

const ExecutorDetails: React.FC = () => {
  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {location, navigate} = useContext(DashboardContext);

  const currentExecutorDetails = useAppSelector(selectCurrentExecutor);

  const name = useLocation().lastPathSegment;

  const [activeTabKey, setActiveTabKey] = useState('Settings');

  const {data: executorDetails, refetch} = useGetExecutorDetailsQuery(name, {skip: !isClusterAvailable});

  const isPageDisabled = !name;

  useEffect(() => {
    dispatch(setCurrentExecutor(name));
  }, [name]);

  useEffect(() => {
    safeRefetch(refetch);
  }, [location]);

  return (
    <StyledContainer>
      <Head title={`${name} | Executors`} />

      <StyledPageHeader onBack={() => navigate('/executors')} title={name} className="testkube-pageheader" />
      <Tabs
        activeKey={activeTabKey}
        onChange={setActiveTabKey}
        destroyInactiveTabPane
        items={[
          {
            key: 'Settings',
            label: 'Settings',
            disabled: isPageDisabled,
            children: currentExecutorDetails ? <ExecutorSettings /> : null,
          },
        ]}
      />
    </StyledContainer>
  );
};

export default ExecutorDetails;
