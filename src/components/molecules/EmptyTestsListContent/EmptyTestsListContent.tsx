import {Button, Text, Title} from '@custom-antd';

import {ReactComponent as CreateTestIcon} from '@assets/create-test.svg';

import Colors from '@styles/Colors';

import HelpCard from '../HelpCard';
import {StyledHelpCardsContainer, StyledLastHelpCardContainer} from '../HelpCard/HelpCard.styled';
import {StyledEmptyTestsDataContainer} from './EmptyTestsListContent.styled';

const EmptyTestsListContent: React.FC<{action: () => void}> = props => {
  const {action} = props;
  return (
    <StyledEmptyTestsDataContainer size={24} direction="vertical">
      <CreateTestIcon />
      <Title className="text-center">Create your first test in a few easy steps.</Title>
      <Text className="regular middle text-center" color={Colors.slate400}>
        Simply define your test, add any variables, execute it and view the results!
      </Text>
      <Button customType="primary" onClick={action}>
        Add a new test
      </Button>
      <StyledHelpCardsContainer>
        <HelpCard isLink link="https://kubeshop.github.io/testkube/tests-creating/">
          Learn how to add tests
        </HelpCard>
        <HelpCard isLink link="https://kubeshop.github.io/testkube/executor-custom/">
          How to add your very own test types and executors?
        </HelpCard>
        <StyledLastHelpCardContainer>
          <HelpCard isHelp link="https://discord.com/invite/hfq44wtR6Q">
            Need help getting started? Want to talk to Testkube engineers?{' '}
            <a href="https://discord.com/invite/hfq44wtR6Q" target="_blank">
              Find us on Discord
            </a>
          </HelpCard>
        </StyledLastHelpCardContainer>
      </StyledHelpCardsContainer>
    </StyledEmptyTestsDataContainer>
  );
};

export default EmptyTestsListContent;
