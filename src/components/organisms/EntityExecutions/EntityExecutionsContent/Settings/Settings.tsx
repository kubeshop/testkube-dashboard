import React, {useContext, useMemo, useState} from 'react';

import {Entity} from '@models/entity';

import {EntityExecutionsContext} from '@contexts';

import {StyledSettingsContainer, StyledTabContentContainer} from './Settings.styled';
import SettingsDefinition from './SettingsDefinition/SettingsDefinition';
import General from './SettingsGeneral';
import SettingsNavigation from './SettingsNavigation';
import SettingsTests from './SettingsTests';

// const secondTabConfig: {[key in Entity]: any} = {
//   'test-suites': <SettingsTests />,
//   tests: <SettingsTestConfig />,
// };

// const thirdTabConfig: {[key in Entity]: any} = {
//   'test-suites': null,
//   tests: null,
// };

// const fourthTabConfig: {[key in Entity]: any} = {
//   'test-suites': null,
//   tests: <SettingsDefinition />,
// };

const tabConfig: {[key in Entity]: Array<JSX.Element | null>} = {
  'test-suites': [<SettingsTests />, null, null],
  tests: [null, null, <SettingsDefinition />],
};

const Settings: React.FC = () => {
  const {entity} = useContext(EntityExecutionsContext);
  const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);

  const subTabsMap = useMemo(() => [<General />, ...tabConfig[entity]], [entity]);

  return (
    <StyledSettingsContainer>
      <SettingsNavigation selectedSettingsTab={selectedSettingsTab} setSelectedSettingsTab={setSelectedSettingsTab} />
      <StyledTabContentContainer>{subTabsMap[selectedSettingsTab]}</StyledTabContentContainer>
    </StyledSettingsContainer>
  );
};

export default Settings;
