import {useContext, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';

import {Tabs} from 'antd';

import {ConfigContext, DashboardContext, MainContext} from '@contexts';

import useLocation from '@hooks/useLocation';

import {useGetTriggerByIdQuery, useGetTriggersKeyMapQuery} from '@services/triggers';

import {useStore} from '@store';

import {safeRefetch} from '@utils/fetchUtils';

import {StyledContainer, StyledPageHeader} from './TriggerDetails.styled';

// import TriggerSettings from './TriggerSettings';

const TriggerDetails = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {location, navigate} = useContext(DashboardContext);
  const {pageTitle} = useContext(ConfigContext);

  const {setCurrentTrigger, setTriggersKeyMap} = useStore(state => ({
    setCurrentTrigger: state.setCurrentTrigger,
    setTriggersKeyMap: state.setTriggersKeyMap,
  }));

  const name = useLocation().lastPathSegment;

  const [activeTabKey, setActiveTabKey] = useState('Settings');

  const {data: triggerDetails, refetch} = useGetTriggerByIdQuery(name, {skip: !isClusterAvailable});
  const {data: triggersKeyMap, refetch: refetchKeyMap} = useGetTriggersKeyMapQuery(null, {skip: !isClusterAvailable});

  const isPageDisabled = !name;

  useEffect(() => {
    if (triggerDetails) {
      setCurrentTrigger(triggerDetails);
    }
  }, [triggerDetails]);

  useEffect(() => {
    if (triggersKeyMap) {
      setTriggersKeyMap(triggersKeyMap);
    }
  }, [triggersKeyMap]);

  useEffect(() => {
    safeRefetch(refetch);
    safeRefetch(refetchKeyMap);
  }, [location]);

  return (
    <StyledContainer>
      <Helmet>
        <title>{`${name} | Triggers | ${pageTitle}`}</title>
      </Helmet>
      <StyledPageHeader onBack={() => navigate('/triggers')} title={name} className="testkube-pageheader" />
      <Tabs activeKey={activeTabKey} onChange={setActiveTabKey} destroyInactiveTabPane>
        <Tabs.TabPane tab="Settings" key="Settings" disabled={isPageDisabled}>
          {/* {triggerDetails ? <TriggerSettings /> : null} */}
        </Tabs.TabPane>
      </Tabs>
    </StyledContainer>
  );
};

export default TriggerDetails;
