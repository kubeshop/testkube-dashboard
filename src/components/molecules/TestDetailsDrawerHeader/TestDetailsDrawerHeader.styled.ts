import styled from 'styled-components';

export const StyledTestDetailsDrawerHeaderContainer = styled.div`
  padding-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const StyledScriptNameType = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1.5em;
`;

export const StyledSCriptNameDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledTestScriptChartAndStatusAndDateContainer = styled.div`
  display: flex;
`;

export const StyledTestStatusAndDateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

export const StyledTestStatusContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-items: center;
    justify-content: center;
  background: var(--color-dark-primary);
  border: 1px solid var(--color-gray-senary);
  border-radius: 3px;
  width: 109px;
  height: 46px;
`;

export const StyledTestDates = styled.div`
  display: flex;
  margin-top: 2px;
`;

export const StyledScriptChartContainer = styled.div`
  display: block;
  height: 105px;
  width: 105px;
  background: var(--color-dark-primary);
  border: 1px solid var(--color-gray-senary);
  border-radius: 3px;
  margin-right: 10px;
`;
