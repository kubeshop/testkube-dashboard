import React, {useContext, useEffect, useMemo, useState} from 'react';

import {Entity} from '@models/entity';

import {EntityExecutionsContext, MainContext} from '@contexts';

import {useAppSelector} from '@src/redux/hooks';
import {closeSettingsTabConfig, selectRedirectTarget} from '@src/redux/reducers/configSlice';

import {StyledSettingsContainer, StyledTabContentContainer} from './Settings.styled';
import SettingsDefinition from './SettingsDefinition/SettingsDefinition';
import General from './SettingsGeneral';
import SettingsNavigation from './SettingsNavigation';
import SettingsTests from './SettingsTests';
import SettingsVariables from './SettingsVariables';

const tabConfig: {[key in Entity]: Array<JSX.Element | null>} = {
  'test-suites': [<General />, <SettingsTests />, <SettingsVariables />, <SettingsDefinition />],
  tests: [<General />, null, <SettingsVariables />, <SettingsDefinition />],
};

const Settings: React.FC = () => {
  const {dispatch} = useContext(MainContext);
  const {entity} = useContext(EntityExecutionsContext);
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
      <SettingsNavigation selectedSettingsTab={selectedSettingsTab} setSelectedSettingsTab={setSelectedSettingsTab} />
      <StyledTabContentContainer>{subTabsMap[selectedSettingsTab]}</StyledTabContentContainer>
    </StyledSettingsContainer>
  );
};

export default Settings;
