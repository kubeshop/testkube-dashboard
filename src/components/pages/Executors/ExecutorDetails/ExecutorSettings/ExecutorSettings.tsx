import {useState} from 'react';

import {SettingsLeftNavigation, StyledSettingsContainer, StyledTabContentContainer} from '@molecules';

import CommandAndArguments from './CommandAndArguments';
import ContainerImage from './ContainerImage';
import ExecutorDefinition from './ExecutorDefinition';
import General from './General';

const tabsConfig = [<General />, <ContainerImage />, <CommandAndArguments />, <ExecutorDefinition />];

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
