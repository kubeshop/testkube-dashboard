import {useState} from 'react';

import {SettingsLeftNavigation, StyledSettingsContainer, StyledTabContentContainer} from '@molecules';

import {PageBlueprint} from '@organisms';

import General from './General';

const tabConfig: Array<JSX.Element | null> = [<General />];

const navigationOptionsConfig: string[] = ['General'];

const GlobalSettings = () => {
  const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);

  return (
    <PageBlueprint title="Settings" description="Control everything related to your testkube installation">
      <StyledSettingsContainer>
        <SettingsLeftNavigation
          options={navigationOptionsConfig}
          selectedOption={selectedSettingsTab}
          setSelectedOption={setSelectedSettingsTab}
        />
        <StyledTabContentContainer>{tabConfig[selectedSettingsTab]}</StyledTabContentContainer>
      </StyledSettingsContainer>
    </PageBlueprint>
  );
};

export default GlobalSettings;
