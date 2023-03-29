import React, {useContext, useEffect, useMemo, useState} from 'react';

import {Entity} from '@models/entity';

import {useAppSelector} from '@redux/hooks';
import {closeSettingsTabConfig, selectRedirectTarget} from '@redux/reducers/configSlice';

import {SettingsLeftNavigation, StyledSettingsContainer, StyledTabContentContainer} from '@molecules';

import {EntityDetailsContext, MainContext} from '@contexts';

import SettingsDefinition from './SettingsDefinition/SettingsDefinition';
import SettingsExecution from './SettingsExecution';
import General from './SettingsGeneral';
import SettingsScheduling from './SettingsScheduling';
import SettingsTest from './SettingsTest';
import SettingsTests from './SettingsTests';
import SettingsVariables from './SettingsVariables';

const tabConfig: {[key in Entity]: Array<JSX.Element | null>} = {
  'test-suites': [
    <General />,
    <SettingsTests />,
    <SettingsVariables />,
    <SettingsScheduling />,
    <SettingsDefinition />,
  ],
  tests: [
    <General />,
    <SettingsTest />,
    <SettingsExecution />,
    <SettingsVariables />,
    <SettingsScheduling />,
    <SettingsDefinition />,
  ],
};

const navigationOptionsConfig: {[key in Entity]: string[]} = {
  'test-suites': ['General', 'Tests', 'Variables & Secrets', 'Scheduling', 'Definition'],
  tests: ['General', 'Test', 'Execution', 'Variables & Secrets', 'Scheduling', 'Definition'],
};

const Settings: React.FC = () => {
  const {dispatch} = useContext(MainContext);
  const {entity} = useContext(EntityDetailsContext);
  const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);

  const {isSettingsTabConfig} = useAppSelector(selectRedirectTarget);

  useEffect(() => {
    if (isSettingsTabConfig) {
      setSelectedSettingsTab(1);
      dispatch(closeSettingsTabConfig());
    }
  }, [isSettingsTabConfig, dispatch]);

  const subTabsMap = useMemo(() => tabConfig[entity], [entity]);

  return (
    <StyledSettingsContainer>
      {entity ? (
        <SettingsLeftNavigation
          options={navigationOptionsConfig[entity]}
          selectedOption={selectedSettingsTab}
          setSelectedOption={setSelectedSettingsTab}
        />
      ) : null}
      <StyledTabContentContainer>{subTabsMap[selectedSettingsTab]}</StyledTabContentContainer>
    </StyledSettingsContainer>
  );
};

export default Settings;
