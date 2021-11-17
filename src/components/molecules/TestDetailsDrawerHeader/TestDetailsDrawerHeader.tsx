import React from 'react';

import {Typography, TestTypeIcon, RenderTestStatusSvgIcon, TKubeDivider, RingProgressChart} from '@atoms';

import {
  StyledTestDetailsDrawerHeaderContainer,
  StyledScriptNameType,
  StyledSCriptNameDescriptionContainer,
  StyledScriptChartContainer,
  StyledTestScriptChartAndStatusAndDateContainer,
  StyledTestStatusContainer,
  StyledTestStatusAndDateContainer,
  StyledTestDates,
} from './TestDetailsDrawerHeader.styled';

const TestDetailsDrawerHeader = (data: any) => {
  return (
    <StyledTestDetailsDrawerHeaderContainer>
      {console.log('HEADER DATA', data)}
      <Typography color="tertiary" variant="tertiary">
        Cypress Test Name
      </Typography>
      <StyledScriptNameType>
        <Typography color="tertiary" variant="quaternary">
          Long cypress Test
        </Typography>
        <StyledSCriptNameDescriptionContainer>
          <Typography color="secondary" variant="secondary" style={{marginRight: '10px'}}>
            postman
          </Typography>
          <TestTypeIcon testType="cypress" width={26} height={26} />
        </StyledSCriptNameDescriptionContainer>
      </StyledScriptNameType>
      <StyledTestScriptChartAndStatusAndDateContainer>
        <StyledScriptChartContainer>
          <RingProgressChart testResultType="failed" height={100} width={100} />
        </StyledScriptChartContainer>
        <StyledTestStatusAndDateContainer>
          <StyledTestStatusContainer>
            <RenderTestStatusSvgIcon testStatus="error" />
            <Typography color="tertiary" variant="quaternary" style={{marginLeft: '10px'}}>
              Failed
            </Typography>
          </StyledTestStatusContainer>

          <StyledTestDates>
            <Typography
              color="secondary"
              variant="secondary"
              font="bold"
              style={{marginRight: '10px', marginTop: '10px'}}
            >
              Start
            </Typography>
            <Typography color="secondary" variant="secondary" style={{marginRight: '10px', marginTop: '10px'}}>
              09/12/2021 24:00:00
            </Typography>
          </StyledTestDates>

          <StyledTestDates>
            <Typography color="secondary" variant="secondary" font="bold" style={{marginRight: '10px'}}>
              End
            </Typography>
            <Typography color="secondary" variant="secondary" style={{marginRight: '10px'}}>
              09/12/2021 24:00:00
            </Typography>
          </StyledTestDates>
        </StyledTestStatusAndDateContainer>
      </StyledTestScriptChartAndStatusAndDateContainer>
      <TKubeDivider />
    </StyledTestDetailsDrawerHeaderContainer>
  );
};

export default TestDetailsDrawerHeader;
