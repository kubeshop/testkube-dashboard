import styled from 'styled-components';

export const MainTableStyles = styled.table`
  table-layout: fixed;
  width: 90vw;
  height: 90vh;
  text-align: center;
  margin: 0 auto;
`;

export const StyledTestResults = styled.tr`
  display: flex;
  height: 140px;
  border-top-style: none;
  border-bottom-style: 1px solid var(--color-gray-secondary);
  word-wrap: break-word;
`;

export const StyledTestFilter = styled.tr`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  border-right-style: hidden;
  border-left-style: hidden;
  height: 70px;
`;

export const StyledTestSummary = styled.tr`
  border-top-style: hidden;
  height: 55vh;
  display: flex;

  // @media only screen and (min-width: 2500px) {
  //   height: 85vh;
  // }
`;
