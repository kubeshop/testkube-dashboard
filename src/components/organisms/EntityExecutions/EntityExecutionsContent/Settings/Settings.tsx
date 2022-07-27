import React, {useState} from 'react';

import {StyledSettingsContainer, StyledTabContentContatner} from './Settings.styled';
import General from './SettingsGeneral';
import SettingsNavigation from './SettingsNavigation';

const Settings: React.FC = () => {
  const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);

  const subTabsMap = [<General />];

  return (
    <StyledSettingsContainer>
      <SettingsNavigation selectedSettingsTab={selectedSettingsTab} setSelectedSettingsTab={setSelectedSettingsTab} />
      <StyledTabContentContatner>{subTabsMap[selectedSettingsTab]}</StyledTabContentContatner>
    </StyledSettingsContainer>
  );
};

export default Settings;
