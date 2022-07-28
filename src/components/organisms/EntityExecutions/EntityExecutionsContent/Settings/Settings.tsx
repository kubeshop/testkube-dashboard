import React, {useContext, useMemo, useState} from 'react';

import {Entity} from '@models/entity';

import {EntityExecutionsContext} from '../../EntityExecutionsContainer/EntityExecutionsContainer';
import {StyledSettingsContainer, StyledTabContentContatner} from './Settings.styled';
import General from './SettingsGeneral';
import SettingsNavigation from './SettingsNavigation';
import SettingsTestConfig from './SettingsTestConfig';
import SettingsTests from './SettingsTests';

const secondTabConfig: {[key in Entity]: any} = {
  'test-suites': <SettingsTests />,
  tests: <SettingsTestConfig />,
};

const Settings: React.FC = () => {
  const {entity} = useContext(EntityExecutionsContext);
  const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);

  const subTabsMap = useMemo(() => [<General />, secondTabConfig[entity]], [entity]);

  return (
    <StyledSettingsContainer>
      <SettingsNavigation selectedSettingsTab={selectedSettingsTab} setSelectedSettingsTab={setSelectedSettingsTab} />
      <StyledTabContentContatner>{subTabsMap[selectedSettingsTab]}</StyledTabContentContatner>
    </StyledSettingsContainer>
  );
};

export default Settings;
