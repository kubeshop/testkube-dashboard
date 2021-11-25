import React from 'react';
import styled from 'styled-components';
import {Row, Col} from 'antd';

import {ResultDatePicker, TestsFilter} from '@molecules';
import {Typography} from '@atoms';

const StyledHeaderTypographyContainer = styled(Row)`
  position: relative;
  top: 30px;
`;

const StyledDatePickerAndFiltersContainer = styled(Row)`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  top: 20px;
`;

const StyledTestHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledTestFiltersCols = styled(Col)`
  &:nth-child(2) {
    display: flex;
    justify-content: end;
  }
`;

interface ITestHeaderProps {
  testHeaderLabel: string;
  showTestFilters: boolean;
}

const TestHeader = ({testHeaderLabel, showTestFilters}: ITestHeaderProps) => {
  return (
    <StyledTestHeaderContainer>
      <StyledHeaderTypographyContainer>
        <Typography variant="quaternary" style={{marginBottom: '20px'}} data-testid="Tests">
          {testHeaderLabel}
        </Typography>
      </StyledHeaderTypographyContainer>

      <StyledDatePickerAndFiltersContainer>
        {showTestFilters && (
          <>
            <StyledTestFiltersCols span={12} xs={24} xl={12}>
              <ResultDatePicker />
            </StyledTestFiltersCols>

            <StyledTestFiltersCols span={12} xs={24} xl={12}>
              <TestsFilter />
            </StyledTestFiltersCols>
          </>
        )}
      </StyledDatePickerAndFiltersContainer>
    </StyledTestHeaderContainer>
  );
};

export default TestHeader;
