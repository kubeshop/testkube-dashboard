import React from 'react';
// import {TestHeader, TestListTable} from '@organisms';
import {TestHeader} from '@organisms';
import {TestDescription, TestsList} from '@src/components/molecules';
import {StyledMainContent, StyledTestHeader, StyledTestSummary} from './Main.styled';

const Main = () => {
  return (
    <>
      <StyledMainContent>
        <StyledTestHeader>
          <TestHeader testHeaderLabel="Tests" showTestFilters />
        </StyledTestHeader>
        <StyledTestSummary>
          <TestsList />
        </StyledTestSummary>
      </StyledMainContent>
      <TestDescription />
    </>
  );
};

export default Main;
