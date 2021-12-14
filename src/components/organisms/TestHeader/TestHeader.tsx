/* eslint-disable unused-imports/no-unused-imports-ts */
import {Col, Row} from 'antd';

import styled from 'styled-components';

import {ResultDatePicker, TestsFilter} from '@molecules';

const StyledHeaderTypographyContainer = styled(Row)`
  position: relative;
`;

const StyledDatePickerAndFiltersContainer = styled(Row)`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
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
