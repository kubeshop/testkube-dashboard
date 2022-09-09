import {useContext} from 'react';

import {Button, Title} from '@custom-antd';

import emptyContentImage from '@assets/empty-content.svg';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {
  StyledButtonContainer,
  StyledContainer,
  StyledDescription,
  StyledEmptyContentImage,
} from './EmptyEntityListContent.styled';

type EmptyEntityListContentProps = {
  entityType: 'tests' | 'test-suites';
};

const constantTextsMap = {
  tests: {
    title: 'Create your first test in a few easy steps.',
    description: 'Simply define your test, execute it and view the results!',
    addButton: 'Add a new test',
  },
  'test-suites': {
    title: 'Create your first test suite in a few easy steps.',
    description: 'Simply define your test suites, add any tests, execute it and view the results!',
    addButton: 'Add a new test suite',
  },
};

const EmptyEntityListContent: React.FC<EmptyEntityListContentProps> = props => {
  const {navigate} = useContext(MainContext);

  const {entityType} = props;

  return (
    <StyledContainer size={32} data-cy="empty-tests-data">
      <StyledEmptyContentImage src={emptyContentImage} preview={false} />
      <Title level={2} color={Colors.whitePure}>
        {constantTextsMap[entityType].title}
      </Title>
      <StyledDescription>{constantTextsMap[entityType].description}</StyledDescription>
      <StyledButtonContainer>
        <Button
          type="default"
          onClick={() => window.open('https://kubeshop.github.io/testkube/using-testkube/tests/tests-creating/', '_blank')}
        >
          Learn More
        </Button>
        <Button type="primary" onClick={() => navigate('/dashboard/tests/add-test')} data-cy="add-test-button">
          {constantTextsMap[entityType].addButton}
        </Button>
      </StyledButtonContainer>
    </StyledContainer>
  );
};

export default EmptyEntityListContent;
