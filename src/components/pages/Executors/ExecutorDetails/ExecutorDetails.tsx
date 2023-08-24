import {useContext} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {MainContext} from '@contexts';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {PageHeader, PageWrapper} from '@organisms';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useGetExecutorDetailsQuery} from '@services/executors';

import {useExecutorsPick, useExecutorsSync} from '@store/executors';

import ExecutorSettings from './ExecutorSettings';

const ExecutorDetails: React.FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {id: name, settingsTab = 'general'} = useParams() as {id: string; settingsTab?: string};

  const {data: executor, error} = useGetExecutorDetailsQuery(name, {skip: !isClusterAvailable});

  const {current: currentExecutorDetails} = useExecutorsPick('current');
  useExecutorsSync({
    current: executor?.name === name ? executor : undefined,
  });

  const setSettingsTab = useDashboardNavigate((next: string) => `/executors/${name}/settings/${next}`);
  const back = useDashboardNavigate('/executors');

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }
  if (!executor || !currentExecutorDetails) {
    return <Loading />;
  }

  return (
    <PageWrapper>
      <PageMetadata title={`${name} | Executors`} />

      <PageHeader onBack={back} title={name} />
      <Tabs
        destroyInactiveTabPane
        items={[
          {
            key: 'settings',
            label: 'Settings',
            children: currentExecutorDetails ? (
              <ExecutorSettings tab={settingsTab} onTabChange={setSettingsTab} />
            ) : null,
          },
        ]}
      />
    </PageWrapper>
  );
};

export default ExecutorDetails;
