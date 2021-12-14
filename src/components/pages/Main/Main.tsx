import {TestDescription} from '@molecules';

import {TestHeader, TestListTable} from '@organisms';

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
