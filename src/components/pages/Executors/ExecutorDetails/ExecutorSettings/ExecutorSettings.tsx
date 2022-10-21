import {useState} from 'react';

import {SettingsLeftNavigation, StyledSettingsContainer, StyledTabContentContainer} from '@molecules';

import CommandAndArguments from './CommandAndArguments';
import ContainerImage from './ContainerImage';
import Definition from './Definition';
import General from './General';

const tabsConfig: Array<JSX.Element> = [<General />, <ContainerImage />, <CommandAndArguments />, <Definition />];

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
