import React from 'react';
import {TestHeader, TestListTable} from '@organisms';
import {TestDescription} from '@src/components/molecules';
import {StyledMainContent, StyledTestHeader, StyledTestSummary} from './Main.styled';

const Main = () => {
  return (
    <>
      <StyledMainContent>
        <StyledTestHeader>
          <TestHeader testHeaderLabel="Test Results" showTestFilters />
        </StyledTestHeader>
        <StyledTestSummary>
          <TestListTable />
        </StyledTestSummary>
      </StyledMainContent>
      <TestDescription />
    </>
  );
};

export default Main;
