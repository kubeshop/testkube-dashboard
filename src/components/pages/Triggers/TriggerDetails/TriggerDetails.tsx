import {useCallback, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {MainContext} from '@contexts';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {PageHeader, PageWrapper} from '@organisms';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useGetTriggerByIdQuery, useGetTriggersKeyMapQuery} from '@services/triggers';

import {useTriggersPick, useTriggersSync} from '@store/triggers';

import {safeRefetch} from '@utils/fetchUtils';

import TriggerSettings from './TriggerSettings';

const TriggerDetails = () => {
  const {isClusterAvailable} = useContext(MainContext);

  const {id: name, settingsTab = 'general'} = useParams() as {id: string; settingsTab?: string};

  const {data: triggerDetails, error, refetch} = useGetTriggerByIdQuery(name, {skip: !isClusterAvailable});
  const {data: triggersKeyMap, refetch: refetchKeyMap} = useGetTriggersKeyMapQuery(null, {skip: !isClusterAvailable});
  const reload = useCallback(() => safeRefetch(refetch), [refetch]);

  const currentState = useTriggersPick('keyMap', 'current');
  useTriggersSync({
    keyMap: triggersKeyMap ?? currentState.keyMap,
    current: triggerDetails ?? currentState.current,
  });

  useEffect(() => {
    reload();
  }, [name]);

  const setSettingsTab = useDashboardNavigate((next: string) => `/triggers/${name}/settings/${next}`);
  const back = useDashboardNavigate('/triggers');

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }
  if (!triggerDetails || !currentState.current) {
    return <Loading />;
  }

  return (
    <PageWrapper>
      <PageMetadata title={`${name} | Triggers`} />

      <PageHeader onBack={back} title={name} />
      <Tabs
        destroyInactiveTabPane
        items={[
          {
            key: 'settings',
            label: 'Settings',
            children: <TriggerSettings tab={settingsTab} onTabChange={setSettingsTab} />,
          },
        ]}
      />
    </PageWrapper>
  );
};

export default TriggerDetails;
