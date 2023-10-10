import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {PageHeader, PageWrapper} from '@organisms';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useGetSourceDetailsQuery} from '@services/sources';

import {useSourcesPick, useSourcesSync} from '@store/sources';

import SourceSettings from './SourceSettings';

const SourceDetails = () => {
  const isClusterAvailable = useSystemAccess(SystemAccess.agent);

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

export default SourceDetails;
