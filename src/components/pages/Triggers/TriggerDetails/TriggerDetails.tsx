import {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {DashboardContext, MainContext} from '@contexts';

import {PageHeader, PageWrapper} from '@organisms';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useGetTriggerByIdQuery, useGetTriggersKeyMapQuery} from '@services/triggers';

import {useTriggersPick, useTriggersSync} from '@store/triggers';

import {safeRefetch} from '@utils/fetchUtils';

import TriggerSettings from './TriggerSettings';

const TriggerDetails = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);

  const name = useParams().id!;

  const [activeTabKey, setActiveTabKey] = useState('Settings');

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

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }
  if (!triggerDetails) {
    return <Loading />;
  }

  return (
    <PageWrapper>
      <PageMetadata title={`${name} | Triggers`} />

      <PageHeader onBack={() => navigate('/triggers')} title={name} />
      <Tabs
        activeKey={activeTabKey}
        onChange={setActiveTabKey}
        destroyInactiveTabPane
        items={[
          {
            key: 'Settings',
            label: 'Settings',
            children: <TriggerSettings reload={reload} />,
          },
        ]}
      />
    </PageWrapper>
  );
};

export default TriggerDetails;
