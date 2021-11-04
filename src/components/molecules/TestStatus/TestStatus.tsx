import React from 'react';
import styled from 'styled-components';

interface ITestStatusProps {
  testTitle: string;
  totalTests: number | undefined;
}

interface ITestStatusStyles {
  testTitleColor?: string;
  totalTestsColor?: string;
}

const StyledTestStatus = styled.div`
  text-align: start;
`;

const StyledTestTitle = styled.span<ITestStatusStyles>`
  font-size: var(--font-size-md);
  color: ${props =>
    props.testTitleColor === 'white' ? 'var(--color-light-secondary)' : 'var(--color-yellow-primary)'};
  font-weight: var(--font-weight-small);
`;

const StyledTotalTests = styled.span<ITestStatusStyles>`
  font-size: var(--font-size-mid-4xl);
  color: ${props =>
    props.totalTestsColor === 'white' ? 'var(--color-light-secondary)' : 'var(--color-yellow-primary)'};
`;

const TestStatus: React.FC<ITestStatusProps & ITestStatusStyles> = ({
  testTitle,
  totalTests,
  testTitleColor,
  totalTestsColor,
}) => {
  return (
    <>
      <StyledTestStatus>
        <StyledTestTitle testTitleColor={testTitleColor}> {testTitle}</StyledTestTitle>
        <br />
        <StyledTotalTests totalTestsColor={totalTestsColor}>{totalTests || '0'}</StyledTotalTests>
      </StyledTestStatus>
    </>
  );
};

export default TestStatus;
