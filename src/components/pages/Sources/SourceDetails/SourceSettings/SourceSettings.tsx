import {useState} from 'react';

import {SettingsLeftNavigation, StyledSettingsContainer, StyledTabContentContainer} from '@molecules';

import Definition from './Definition';
import General from './General';

const tabsConfig: Array<JSX.Element> = [<General />, <Definition />];

const navigationOptionsConfig: string[] = ['General', 'Definition'];

const SourceSettings = () => {
  const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);

  return (
    <StyledSettingsContainer>
      <SettingsLeftNavigation
        options={navigationOptionsConfig}
        selectedOption={selectedSettingsTab}
        setSelectedOption={setSelectedSettingsTab}
      />
      <StyledTabContentContainer>{tabsConfig[selectedSettingsTab]}</StyledTabContentContainer>
    </StyledSettingsContainer>
  );
};

export default SourceSettings;
