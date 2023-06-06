import {useState} from 'react';

import {SettingsLeftNavigation, StyledSettingsContainer, StyledTabContentContainer} from '@molecules';

import Definition from './Definition';
import General from './General';
import TriggerAction from './TriggerAction';
import TriggerCondition from './TriggerCondition';

const tabsConfig: Array<JSX.Element> = [<General />, <TriggerCondition />, <TriggerAction />, <Definition />];

const navigationOptionsConfig: string[] = ['General', 'Trigger Condition', 'Trigger Action', 'Definition'];

const TriggerSettings = () => {
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

export default TriggerSettings;
