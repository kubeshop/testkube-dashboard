import {useState} from 'react';

import {SettingsLeftNavigation, StyledSettingsContainer, StyledTabContentContainer} from '@molecules';

import Definition from './Definition';
import General from './General';

const tabsConfig: Array<JSX.Element> = [<General />, <div />, <div />, <Definition />];

const navigationOptionsConfig: string[] = ['General', 'Container image', 'Command & Arguments', 'Definition'];

const ExecutorSettings = () => {
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

export default ExecutorSettings;
