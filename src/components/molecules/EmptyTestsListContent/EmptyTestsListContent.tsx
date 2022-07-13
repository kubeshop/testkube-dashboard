import {useContext} from 'react';

import {Button, Text, Title} from '@custom-antd';

import {ReactComponent as CreateTest} from '@assets/create-test.svg';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {StyledButtonContainer, StyledEmptyTestsDataContainer} from './EmptyTestsListContent.styled';

const EmptyTestsListContent: React.FC = () => {
  const {navigate} = useContext(MainContext);

  return (
    <StyledEmptyTestsDataContainer size={30} direction="vertical">
      <CreateTest />
      <Title className="text-center">Create your first test in a few easy steps.</Title>
      <Text className="regular middle text-center" color={Colors.slate400}>
        Simply define your test, add any variables, execute it and view the results!
      </Text>
      <StyledButtonContainer>
        <Button onClick={() => window.open('https://kubeshop.github.io/testkube/tests-creating/', '_blank')}>
          Learn more
        </Button>
        <Button type="primary" onClick={() => navigate('/dashboard/tests/add-test')}>
          Add a new test
        </Button>
      </StyledButtonContainer>
    </StyledEmptyTestsDataContainer>
  );
};

export default EmptyTestsListContent;
