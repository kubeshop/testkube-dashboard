import {useCallback, useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {DashboardContext, MainContext} from '@contexts';

import {PageHeader, PageWrapper} from '@organisms';

import PageMetadata from '@pages/PageMetadata';

import {useGetTriggerByIdQuery, useGetTriggersKeyMapQuery} from '@services/triggers';

import {useTriggersPick, useTriggersSync} from '@store/triggers';

import {safeRefetch} from '@utils/fetchUtils';

import TriggerSettings from './TriggerSettings';

const TriggerDetails = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {location, navigate} = useContext(DashboardContext);

  const name = useParams().id!;

  const [activeTabKey, setActiveTabKey] = useState('Settings');

  const {data: triggerDetails, refetch} = useGetTriggerByIdQuery(name, {skip: !isClusterAvailable});
  const {data: triggersKeyMap, refetch: refetchKeyMap} = useGetTriggersKeyMapQuery(null, {skip: !isClusterAvailable});
  const reload = useCallback(() => safeRefetch(refetch), [refetch]);

  const isPageDisabled = !name;

  const currentState = useTriggersPick('keyMap', 'current');
  useTriggersSync({
    keyMap: triggersKeyMap ?? currentState.keyMap,
    current: triggerDetails ?? currentState.current,
  });

  useEffect(() => {
    reload();
  }, [name]);

  return (
    <PageWrapper>
      <PageMetadata title={`${name} | Triggers`} />

      <PageHeader onBack={() => navigate('/triggers')} title={name} />
      <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} destroyInactiveTabPane>
        <Tabs.TabPane tab="Settings" key="Settings" disabled={isPageDisabled}>
          {triggerDetails ? <TriggerSettings reload={reload} /> : null}
        </Tabs.TabPane>
      </Tabs>
    </PageWrapper>
  );
};

export default TriggerDetails;
