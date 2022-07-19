import {useContext} from 'react';

import {Typography} from 'antd';

import {Button, Text, Title} from '@custom-antd';

import {ReactComponent as CreateTest} from '@assets/create-test.svg';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import HelpCard from '../HelpCard';
import {
  StyledEmptyTestSuitesDataContainer,
  StyledHelpCardsContainer,
  StyledLastHelpCardContainer,
} from './EmptyTestSuitesListContent.styled';

const {Link} = Typography;

const EmptyTestSuitesListContent: React.FC = () => {
  const {navigate} = useContext(MainContext);

  return (
    <StyledEmptyTestSuitesDataContainer size={80} direction="vertical">
      <CreateTest />
      <Title className="text-center">Create your first test suite in a few easy steps.</Title>
      <Text className="regular middle text-center" color={Colors.slate400}>
        Simply define your test suites, add any tests, execute it and view the results!
      </Text>
      <Button customType="primary" onClick={() => navigate('/dashboard/tests/add-test')}>
        Add a new test suite
      </Button>
      <StyledHelpCardsContainer>
        <HelpCard isLink>Learn how to add test suites</HelpCard>
        <HelpCard isLink>How to build an optimal test pipeline</HelpCard>
        <StyledLastHelpCardContainer>
          <HelpCard isHelp>
            Need help getting started? Want to talk to Testkube engineers?{' '}
            <Link href="https://ant.design" target="_blank">
              Find us on Discord
            </Link>
          </HelpCard>
        </StyledLastHelpCardContainer>
      </StyledHelpCardsContainer>
    </StyledEmptyTestSuitesDataContainer>
  );
};

export default EmptyTestSuitesListContent;
