import {getStatus} from '@redux/utils/requestFilters';

import {RenderTestStatusSvgIcon, RingProgressChart, Typography} from '@atoms';

import {timeStampToDate} from '@utils/formatDate';

import {
  StyledScriptChartContainer,
  StyledTestDates,
  StyledTestDetailsDrawerHeaderContainer,
  StyledTestScriptChartAndStatusAndDateContainer,
  StyledTestStatusAndDateContainer,
  StyledTestStatusContainer,
} from './TestDetailsDrawerHeader.styled';

const TestDetailsDrawerHeader = (props: any) => {
  const {scriptName, name, scriptType, startTime, endTime, executionResult} = props;

  return (
    <StyledTestDetailsDrawerHeaderContainer>
      <StyledTestScriptChartAndStatusAndDateContainer>
        <StyledScriptChartContainer>
          <RingProgressChart
            steps={executionResult?.steps}
            testStatus={getStatus(executionResult?.status)}
            height={85}
            width={85}
            fontSize="small"
          />
        </StyledScriptChartContainer>
        <StyledTestStatusAndDateContainer>
          <StyledTestStatusContainer>
            <RenderTestStatusSvgIcon testStatus={getStatus(executionResult?.status)} />
            <Typography color="tertiary" variant="quaternary" style={{marginLeft: '10px', textTransform: 'capitalize'}}>
              {getStatus(executionResult?.status)}
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
              {timeStampToDate(startTime)}
            </Typography>
          </StyledTestDates>

          <StyledTestDates>
            <Typography color="secondary" variant="secondary" font="bold" style={{marginRight: '10px'}}>
              End
            </Typography>
            <Typography color="secondary" variant="secondary" style={{marginRight: '10px'}}>
              {timeStampToDate(endTime)}
            </Typography>
          </StyledTestDates>
        </StyledTestStatusAndDateContainer>
      </StyledTestScriptChartAndStatusAndDateContainer>
    </StyledTestDetailsDrawerHeaderContainer>
  );
};

export default TestDetailsDrawerHeader;
