import {useCallback, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {DashboardContext, MainContext} from '@contexts';

import {useLastCallback} from '@hooks/useLastCallback';

import {PageHeader, PageWrapper} from '@organisms';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, setCurrentExecutor, setExecutorData} from '@redux/reducers/executorsSlice';

import {useGetExecutorDetailsQuery} from '@services/executors';

import {safeRefetch} from '@utils/fetchUtils';

import ExecutorSettings from './ExecutorSettings';

const ExecutorDetails: React.FC = () => {
  const {dispatch, isClusterAvailable} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);
  const {id: name, settingsTab = 'general'} = useParams() as {id: string; settingsTab?: string};

  const currentExecutorDetails = useAppSelector(selectCurrentExecutor);

  const {data: executor, error, refetch} = useGetExecutorDetailsQuery(name, {skip: !isClusterAvailable});
  const reload = useCallback(() => safeRefetch(refetch), [refetch]);

  useEffect(() => {
    dispatch(setCurrentExecutor(name));
    reload();
  }, [name]);

  useEffect(() => {
    if (executor) {
      dispatch(setExecutorData({name, executor}));
    }
  }, [executor]);

  const setSettingsTab = useLastCallback((nextTab: string) => {
    navigate(`/executors/${name}/settings/${nextTab}`);
  });

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }
  if (!executor || !currentExecutorDetails) {
    return <Loading />;
  }

  return (
    <PageWrapper>
      <PageMetadata title={`${name} | Executors`} />

      <PageHeader onBack={() => navigate('/executors')} title={name} />
      <Tabs
        destroyInactiveTabPane
        items={[
          {
            key: 'settings',
            label: 'Settings',
            children: currentExecutorDetails ? (
              <ExecutorSettings tab={settingsTab} onTabChange={setSettingsTab} reload={reload} />
            ) : null,
          },
        ]}
      />
    </PageWrapper>
  );
};

export default ExecutorDetails;
