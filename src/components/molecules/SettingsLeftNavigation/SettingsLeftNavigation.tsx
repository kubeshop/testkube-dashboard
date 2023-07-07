import {memo} from 'react';

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

  return (
    <StyledNavigationContainer>
      {options.map((value, index) => (
        <StyledNavigationOptionContainer key={value} onClick={() => setSelectedOption(index)}>
          <Text className="bold middle" color={selectedOption === index ? Colors.slate50 : Colors.slate400}>
            {value}
          </Text>
        </StyledNavigationOptionContainer>
      ))}
    </StyledNavigationContainer>
  );
};

export default memo(SettingsLeftNavigation);
