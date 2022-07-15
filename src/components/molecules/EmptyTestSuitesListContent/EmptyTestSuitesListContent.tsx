import {useContext} from 'react';

import {Button, Text, Title} from '@custom-antd';

import {ReactComponent as CreateTest} from '@assets/create-test.svg';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {StyledEmptyTestSuitesDataContainer} from './EmptyTestSuitesListContent.styled';

const EmptyTestSuitesListContent: React.FC = () => {
  const {navigate} = useContext(MainContext);

  return (
    <StyledEmptyTestSuitesDataContainer size={30} direction="vertical">
      <CreateTest />
      <Title className="text-center">Create your first test suite in a few easy steps.</Title>
      <Text className="regular middle text-center" color={Colors.slate400}>
        Simply define your test suites, add any tests, execute it and view the results!
      </Text>
      <Button customType="primary" onClick={() => navigate('/dashboard/tests/add-test')}>
        Add a new test
      </Button>
    </StyledEmptyTestSuitesDataContainer>
  );
};

export default EmptyTestSuitesListContent;
