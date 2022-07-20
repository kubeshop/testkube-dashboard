import {Button, Text, Title} from '@custom-antd';

import {ReactComponent as CreateTestIcon} from '@assets/create-test.svg';

import Colors from '@styles/Colors';

import HelpCard from '../HelpCard';
import {StyledHelpCardsContainer, StyledLastHelpCardContainer} from '../HelpCard/HelpCard.styled';
import {StyledEmptyTestSuitesDataContainer} from './EmptyTestSuitesListContent.styled';

const EmptyTestSuitesListContent: React.FC<{action: () => void}> = props => {
  const {action} = props;
  return (
    <StyledEmptyTestSuitesDataContainer size={24} direction="vertical">
      <CreateTestIcon />
      <Title className="text-center">Create your first test suite in a few easy steps.</Title>
      <Text className="regular middle text-center" color={Colors.slate400}>
        Simply define your test suites, add any tests, execute it and view the results!
      </Text>
      <Button customType="primary" onClick={action}>
        Add a new test suite
      </Button>
      <StyledHelpCardsContainer>
        <HelpCard isLink link="https://kubeshop.github.io/testkube/testsuites-creating/">
          Learn how to add test suites
        </HelpCard>
        <HelpCard isLink link="https://kubeshop.github.io/testkube/testsuites-creating/">
          {/* Need to update link here, did't managed to find correct one */}
          How to build an optimal test pipeline
        </HelpCard>
        <StyledLastHelpCardContainer>
          <HelpCard isHelp>
            Need help getting started? Want to talk to Testkube engineers?{' '}
            <a href="https://discord.com/invite/hfq44wtR6Q" target="_blank">
              Find us on Discord
            </a>
          </HelpCard>
        </StyledLastHelpCardContainer>
      </StyledHelpCardsContainer>
    </StyledEmptyTestSuitesDataContainer>
  );
};

export default EmptyTestSuitesListContent;
