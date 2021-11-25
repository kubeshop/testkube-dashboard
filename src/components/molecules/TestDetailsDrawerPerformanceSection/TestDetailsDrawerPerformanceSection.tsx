import React from 'react';
import styled from 'styled-components';

import {Typography, TKubeDivider} from '@atoms';
import {TestDetailsLineChart} from '@molecules';

import {StyledTestDetailsDrawerPerformanceSection} from './TestDetailsDrawerPerformanceSection.styled';

interface ITestDetailsDrawerPerformanceSection {
  showOverView?: boolean;
  bordered?: boolean;
  main?: boolean;
  testDescriptionData?: any;
}

export const StyledTestDetailsDrawerPerformanceChart = styled.div<ITestDetailsDrawerPerformanceSection>`
  width: 100%;
  height: 190px;
  border-radius: 3px;
  border: ${props => (props.bordered ? '1px solid var(--color-gray-senary)' : 'none')};
`;

const TestDetailsDrawerPerformanceSection = ({
  showOverView,
  main,
  bordered = true,
  testDescriptionData,
}: ITestDetailsDrawerPerformanceSection) => {
  return (
    <>
      <StyledTestDetailsDrawerPerformanceSection>
        <Typography variant="tertiary" color="tertiary" style={{position: 'relative', top: `${main ? '20px' : '0'}`}}>
          Performance over Time
        </Typography>
        <StyledTestDetailsDrawerPerformanceChart bordered={bordered}>
          <TestDetailsLineChart performanceOverTime={testDescriptionData} />
        </StyledTestDetailsDrawerPerformanceChart>
      </StyledTestDetailsDrawerPerformanceSection>
      {showOverView && <TKubeDivider />}
    </>
  );
};

export default TestDetailsDrawerPerformanceSection;
