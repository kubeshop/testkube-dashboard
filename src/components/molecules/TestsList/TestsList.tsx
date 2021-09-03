import React, {useState, useContext} from 'react';
import styled from 'styled-components';

import {Typography, Image} from '@atoms';
import RunningTestIcon from '@assets/testRunningIcon.svg';
import FailedTestIcon from '@assets/testFailedIcon.svg';
import SuccessTestIcon from '@assets/testSuccessIcon.svg';

import {TestsContext} from '@context/testsContext';
import {timeStampToDate} from '@utils/formatDate';

interface ITestTypes {
  testStatus: 'running' | 'failed' | 'success';
}

const ListItem = styled.div`
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background: transparent linear-gradient(90deg, #1890fc 0%, #5bdad3 100%);
  }
`;

const TestListInformation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

function RenderTestStatusSvgIcon({testStatus}: ITestTypes) {
  return (
    <Image
      src={
        testStatus === 'running'
          ? RunningTestIcon
          : testStatus === 'failed'
          ? FailedTestIcon
          : testStatus === 'success'
          ? SuccessTestIcon
          : ''
      }
      alt="testStatus"
      type="svg"
      width={20}
      height={20}
    />
  );
}

const TestsList = () => {
  const [testName, setTestName] = useState<string>('Test Name');
  const [testType, setTestType] = useState<string>('Test Type');
  const [testTimeStamp, setTestTimeStamp] = useState<string>('Test TimeStamp');
  const [testStatus, setTestStatus] = useState<ITestTypes>({testStatus: 'success'});

  const tests: any = useContext(TestsContext);

  return (
    <>
      {tests &&
        tests.ExecutionSummary.map((test: any) => (
          <ListItem>
            <TestListInformation>
              <Typography variant="secondary">{test['id']}</Typography>
            </TestListInformation>
            <TestListInformation>
              <Typography variant="secondary">{test['script-type']}</Typography>
            </TestListInformation>
            <TestListInformation>
              <Typography variant="secondary">
                {timeStampToDate(test['start-time'])}
                {timeStampToDate(test['start-time'])}
              </Typography>
            </TestListInformation>
            <TestListInformation>
              <RenderTestStatusSvgIcon testStatus={test.status} />
            </TestListInformation>
          </ListItem>
        ))}
    </>
  );
};

export default TestsList;
