import {Collapse} from 'antd';

import styled from 'styled-components';

const invisibleScroll = `
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari and Opera */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const StyledTestDescriptionContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const StyledTestOutputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  margin-right: var(--space-lg);
  margin-left: var(--space-md);
  position: relative;
  top: 60px;
  left: var(--space-lg2);
`;

export const StyledPlainTextOutputContainer = styled.div`
  width: 100%;
  height: 446px;
  overflow: auto;
  background-color: var(--color-dark-secondary);

  ${invisibleScroll}
`;

export const StyledTestOutput = styled.span`
  white-space: pre-line;
  color: white;
  text-shadow: 0 0 5px #c8c8c8;
  text-align: left;

  &::selection {
    background: #0080ff;
    text-shadow: none;
  }

  pre {
    padding: 0.3em;
    font-size: 0.9em;
  }
`;

export const StyledText = styled.pre`
  display: flex;

  ${invisibleScroll}
`;

export const StyledTestStepsOutPutContainer = styled.div`
  width: 100%;
  height: 90%;
`;

export const StyledTestStepNameContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 38px;
  border-radius: 3px;
  border: 1px solid var(--color-gray-senary);
  background: var(--color-dark-tertiary);
  color: var(--color-light-primary);
  cursor: pointer;
  border: none;
`;

export const StyledTestStepName = styled.span`
  margin-left: 15px;
  font-size: 14px;
`;

export const StyledTestAssertionResultsContainer = styled.div`
  display: flex;
  color: var(--color-light-primary);
  margin-bottom: 5px;
  overflow: hidden;
  background: var(--color-dark-tertiary);
`;

export const StyledTestStepAssertionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--font-size-sm);
  margin-left: var(--space-md);
`;

export const StyledTestOutputNameAndStatus = styled.div`
  display: flex;
`;

export const StyledTestOutputAssertionName = styled.span`
  margin-left: var(--space-xxs);
  font-size: 14px;
  color: var(--color-light-primary);
`;

export const StyledTestOutputAssertionErrorMessage = styled.span`
  font-size: 14px;
  color: var(--color-light-primary);
`;

export const StyledCollapse = styled(Collapse.Panel)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    border: none;
    height: 100%;
    border-radius: 3px;
    border: 1px solid var(--color-gray-senary);
    background: var(--color-dark-tertiary);
  }
  background: var(--color-dark-tertiary);
`;

export const StyledTestWithoutAssertions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  /* height: 38px; */
  background: var(--color-dark-tertiary);
  margin-top: 5px;
  margin-bottom: var(--space-xxs);
  color: var(--color-light-primary);
  cursor: pointer;
  padding-left: var(--space-md);
`;

export const TestsWithoutStepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: #db5382;
  color: var(--color-light-primary);
  border: 1px solid var(--color-gray-senary);
  height: 38px;
  width: 100%;

  @media screen and (min-width: 2560px) {
    width: 95%;
  }
`;

export const StyledShowFailedStepsContainer = styled.div`
  display: flex;
`;

export const StyledLabelledFailedOnlyCheckbox = styled.label`
  font-size: 14px;
  color: var(--color-gray-primary);
`;

export const StyledFailedOnlyCheckbox = styled.input``;

export const StyledPendingTestExecution = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-md);
  color: var(--color-light-primary);
  width: 100%;
  height: 38px;
  background: var(--color-gray-tertiary);
  border: 1px solid var(--color-gray-secondary);
  border-radius: 3px;
`;
