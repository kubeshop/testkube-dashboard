import React, {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';

import {TestsContext} from '@context/testsContext';
import {timeStampToDate, getDuration} from '@utils/formatDate';
import {RenderTestStatusSvgIcon, Typography} from '@atoms';

const StyledTestDescriptionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledTestDescriptionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: var(--space-md);
  left: var(--space-md);
`;

const StyledTestStatus = styled.div`
  margin-left: var(--space-md);
`;

const StyledTestName = styled.div`
  /* position: relative;
  top: 20px;
  left: 60px; */
`;

const StyledTestTimes = styled.div`
  display: flex;

  /* &:nth-child(1) {
    margin-left: 20px;
  } */
`;

const StyledEndedAt = styled.div``;

const StyledDuration = styled.div`
  margin-left: 20px;
`;

const StyledTestDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  position: relative;
  top: 20px;
  left: 85px;
`;

const TestDescription = () => {
  const [testDescription, setTestDescription] = useState<any>({});
  const tests: any = useContext(TestsContext);

  useEffect(() => {
    if (tests.selectedTest) {
      const test = tests.data.ExecutionSummary.find((t: any) => tests.selectedTest === t['id']);
      setTestDescription(test);
    }
  }, [tests.selectedTest]);

  const renderTestStatus = (testStatus: string) => {
    return testStatus === 'pending'
      ? 'PENDING'
      : testStatus === 'failed'
      ? 'FAILED'
      : testStatus === 'success'
      ? 'SUCCESS'
      : testStatus === 'queued'
      ? 'QUEUED'
      : '';
  };

  return (
    <>
      {tests.selectedTest && (
        <StyledTestDescriptionContainer>
          <StyledTestDescriptionIcon>
            <RenderTestStatusSvgIcon testStatus={testDescription.status} width={50} height={50} />
            <StyledTestStatus>
              <Typography variant="secondary"> TEST {renderTestStatus(testDescription.status)}</Typography>
            </StyledTestStatus>
          </StyledTestDescriptionIcon>
          <StyledTestDescription>
            <StyledTestName>
              <Typography variant="secondary"> Name</Typography>
              <Typography variant="secondary">{testDescription['script-name']}</Typography>
            </StyledTestName>

            <StyledTestTimes>
              <StyledEndedAt>
                <Typography variant="secondary">Ended At</Typography>
                <Typography variant="secondary">{timeStampToDate(testDescription['end-time'])}</Typography>
              </StyledEndedAt>
              <StyledDuration>
                <Typography variant="secondary">Duration</Typography>
                <Typography variant="secondary">{getDuration(testDescription['end-time'])}</Typography>
              </StyledDuration>
            </StyledTestTimes>
          </StyledTestDescription>
        </StyledTestDescriptionContainer>
      )}
    </>
  );
};

export default TestDescription;
