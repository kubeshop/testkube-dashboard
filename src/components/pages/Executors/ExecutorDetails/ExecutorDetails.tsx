import {useContext, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {ConfigContext, DashboardContext, MainContext} from '@contexts';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, setCurrentExecutor, setExecutorData} from '@redux/reducers/executorsSlice';

import {useGetExecutorDetailsQuery} from '@services/executors';

import {safeRefetch} from '@utils/fetchUtils';

import {StyledContainer, StyledPageHeader} from './ExecutorDetails.styled';
import ExecutorSettings from './ExecutorSettings';

const ExecutorDetails: React.FC = () => {
  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {navigate, location} = useContext(DashboardContext);
  const {pageTitle} = useContext(ConfigContext);
  const {id: name} = useParams() as {id: string};

  const currentExecutorDetails = useAppSelector(selectCurrentExecutor);

  const [activeTabKey, setActiveTabKey] = useState('Settings');

  const {data: executor, refetch} = useGetExecutorDetailsQuery(name, {skip: !isClusterAvailable});

  const isPageDisabled = !name;

  useEffect(() => {
    dispatch(setCurrentExecutor(name));
    safeRefetch(refetch);
  }, [name]);

  useEffect(() => {
    if (executor) {
      dispatch(setExecutorData({name, executor}));
    }
  }, [executor]);

  return (
    <StyledContainer>
      <Helmet>
        <title>{`${name} | Executors | ${pageTitle}`}</title>
      </Helmet>
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
