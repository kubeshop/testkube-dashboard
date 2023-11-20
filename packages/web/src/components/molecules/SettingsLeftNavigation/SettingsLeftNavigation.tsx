import {memo, useMemo} from 'react';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {StyledNavigationContainer, StyledNavigationOptionContainer} from './SettingsLeftNavigation.styled';

type SettingsLeftNavigationProps = {
  options: string[];
  selectedOption: number;
  setSelectedOption: (index: number) => void;
};

const SettingsLeftNavigation: React.FC<SettingsLeftNavigationProps> = props => {
  const {options, selectedOption, setSelectedOption} = props;
  const keys = useMemo(() => options.map(value => value.toLowerCase().replace(/[^a-z0-9-?]/g, '-')), [options]);

  return (
    <StyledNavigationContainer>
      {options.map((value, index) => (
        <StyledNavigationOptionContainer
          key={value}
          onClick={() => setSelectedOption(index)}
          data-test={`sidebar-navigation-link:${keys[index]}`}
        >
          <Text className="bold middle" color={selectedOption === index ? Colors.slate50 : Colors.slate400}>
            {value}
          </Text>
        </StyledNavigationOptionContainer>
      ))}
    </StyledNavigationContainer>
  );
};

export default memo(SettingsLeftNavigation);
