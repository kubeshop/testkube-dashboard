import {useContext} from 'react';

import {Entity} from '@models/entity';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {EntityExecutionsContext} from '@contexts';

import {StyledNavigationContatner, StyledNavigationOptionContainer} from './SettingsNavigation.styled';

type SettingsNavigationProps = {
  selectedSettingsTab: number;
  setSelectedSettingsTab: (index: number) => void;
};

const navigationOptionsConfig: {[key in Entity]: string[]} = {
  'test-suites': ['General', 'Tests', 'Variables & Secrets', 'Definition'],
  tests: ['General', 'Variables & Secrets', 'Definition'],
};

const SettingsNavigation: React.FC<SettingsNavigationProps> = props => {
  const {selectedSettingsTab, setSelectedSettingsTab} = props;
  const {entity} = useContext(EntityExecutionsContext);

  return (
    <StyledNavigationContatner>
      {entity
        ? navigationOptionsConfig[entity].map((value, index) => (
            <StyledNavigationOptionContainer key={value} onClick={() => setSelectedSettingsTab(index)}>
              <Text className="bold middle" color={selectedSettingsTab === index ? Colors.slate50 : Colors.slate400}>
                {value}
              </Text>
            </StyledNavigationOptionContainer>
          ))
        : null}
    </StyledNavigationContatner>
  );
};

export default SettingsNavigation;
