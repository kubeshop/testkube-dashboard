import {useMemo, useState} from 'react';

import {SettingsLeftNavigation, StyledSettingsContainer, StyledTabContentContainer} from '@molecules';

import GHActions from './GHActions';

const tabs = [
  {
    label: 'GitHub Action',
    route: 'ghActions',
  },
];

const tabContent = [<GHActions />];

const CICDSettings = () => {
  const [selectedSettingsTab, setSelectedSettingsTab] = useState(0);

  const options = useMemo(() => tabs.map(({label}) => label), [tabs]);

  const onTabChange = (index: number, replace = false) => {
    setSelectedSettingsTab(index);
  };
  return (
    <StyledSettingsContainer>
      <SettingsLeftNavigation options={options} selectedOption={selectedSettingsTab} setSelectedOption={onTabChange} />
      <StyledTabContentContainer>{tabContent[selectedSettingsTab]}</StyledTabContentContainer>
    </StyledSettingsContainer>
  );
};

export default CICDSettings;
