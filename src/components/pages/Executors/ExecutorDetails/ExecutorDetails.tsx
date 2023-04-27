import {useContext, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';

import {Tabs} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, setCurrentExecutor} from '@redux/reducers/executorsSlice';

import useLocation from '@hooks/useLocation';

import {safeRefetch} from '@utils/fetchUtils';

import {useGetExecutorDetailsQuery} from '@services/executors';

import {ConfigContext, DashboardContext, MainContext} from '@contexts';

import {StyledContainer, StyledPageHeader} from './ExecutorDetails.styled';
import ExecutorSettings from './ExecutorSettings';

const ExecutorDetails: React.FC = () => {
  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {location, navigate} = useContext(DashboardContext);
  const {pageTitle} = useContext(ConfigContext);

  const currentExecutorDetails = useAppSelector(selectCurrentExecutor);

  const name = useLocation().lastPathSegment;

  const [activeTabKey, setActiveTabKey] = useState('Settings');

  const {data: executorDetails, refetch} = useGetExecutorDetailsQuery(name, {skip: !isClusterAvailable});

  const isPageDisabled = !name;

  useEffect(() => {
    if (executorDetails) {
      dispatch(setCurrentExecutor(executorDetails));
    }
  }, [executorDetails]);

  useEffect(() => {
    safeRefetch(refetch);
  }, [location]);

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
