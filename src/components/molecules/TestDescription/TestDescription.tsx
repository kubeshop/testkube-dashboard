import React, {useContext, useState, useEffect} from 'react';
import styled from 'styled-components';

import {TestsContext} from '@context/testsContext';
import {timeStampToDate, getDuration} from '@utils/formatDate';
import {RenderTestStatusSvgIcon, Typography} from '@atoms';

const StyledTestDescriptionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: var(--space-md);
  left: var(--space-md);
`;

const StyledTestDescriptionIcon = styled.div`
  position: relative;
  top: -135px;
`;

const StyledTestDescription = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-left: var(--space-md);
`;

const TestDescription = () => {
  const [testDescription, setTestDescription] = useState<any>({});
  const tests: any = useContext(TestsContext);

  useEffect(() => {
    if (tests.selectedTest) {
      const test = tests.data.find((t: any) => tests.selectedTest === t['id']);
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
          </StyledTestDescriptionIcon>
          <StyledTestDescription>
            <Typography variant="secondary"> TEST {renderTestStatus(testDescription.status)}</Typography>
            <div>
              <Typography variant="secondary" font="bold">
                Name
              </Typography>
              <Typography variant="secondary" style={{marginTop: '-15px'}}>
                {testDescription['script-name']}
              </Typography>
            </div>
            <div>
              <Typography variant="secondary" font="bold">
                Ended At
              </Typography>
              <Typography variant="secondary" style={{marginTop: '-15px'}}>
                {testDescription['end-time'] ? timeStampToDate(testDescription['end-time']) : '-'}
              </Typography>
            </div>
            <div>
              <Typography variant="secondary" font="bold">
                Duration
              </Typography>
              <Typography variant="secondary" style={{marginTop: '-15px'}}>
                {testDescription['end-time'] ? getDuration(testDescription['end-time']) : '-'}
              </Typography>
            </div>
            <div>
              <Typography variant="secondary" font="bold">
                Type
              </Typography>
              <Typography variant="secondary" style={{marginTop: '-15px'}}>
                {testDescription['script-type']}
              </Typography>
            </div>
          </StyledTestDescription>
        </StyledTestDescriptionContainer>
      )}
    </>
  );
};

export default TestDescription;
