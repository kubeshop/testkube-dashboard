import {FC, useContext} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {MainContext} from '@contexts/MainContext';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {PageWrapper} from '@organisms/PageBlueprint.styled';
import {PageHeader} from '@organisms/PageBlueprint/PageHeader';

import {Error} from '@pages/Error';
import {Loading} from '@pages/Loading';
import {PageMetadata} from '@pages/PageMetadata';

import {useGetExecutorDetailsQuery} from '@services/executors';

import {useExecutorsPick, useExecutorsSync} from '@store/executors';

import {ExecutorSettings} from './ExecutorDetails/ExecutorSettings';

export const ExecutorDetails: FC = () => {
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
