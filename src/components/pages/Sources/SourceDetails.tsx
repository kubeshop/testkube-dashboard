import {useContext} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {MainContext} from '@contexts/MainContext';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {PageWrapper} from '@organisms/PageBlueprint.styled';
import {PageHeader} from '@organisms/PageBlueprint/PageHeader';

import {Error} from '@pages/Error';
import {Loading} from '@pages/Loading';
import {PageMetadata} from '@pages/PageMetadata';

import {useGetSourceDetailsQuery} from '@services/sources';

import {useSourcesPick, useSourcesSync} from '@store/sources';

import {SourceSettings} from './SourceDetails/SourceSettings';

export const SourceDetails = () => {
  const {isClusterAvailable} = useContext(MainContext);

  const {id: name, settingsTab = 'general'} = useParams() as {id: string; settingsTab?: string};

  const {data: source, error, refetch} = useGetSourceDetailsQuery(name, {skip: !isClusterAvailable});

  const {current: currentSourceDetails} = useSourcesPick('current');
  useSourcesSync({
    current: source?.name === name ? source : undefined,
  });

  const setSettingsTab = useDashboardNavigate((next: string) => `/sources/${name}/settings/${next}`);
  const back = useDashboardNavigate('/sources');

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }
  if (!source || !currentSourceDetails) {
    return <Loading />;
  }

  return (
    <PageWrapper>
      <PageMetadata title={`${name} | Sources`} />

      <PageHeader onBack={back} title={name} />
      <Tabs
        destroyInactiveTabPane
        items={[
          {
            key: 'settings',
            label: 'Settings',
            children: <SourceSettings tab={settingsTab} onTabChange={setSettingsTab} />,
          },
        ]}
      />
    </PageWrapper>
  );
};
