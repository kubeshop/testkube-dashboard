import React, {useContext} from 'react';
import styled from 'styled-components';

import {Typography, RenderTestStatusSvgIcon} from '@atoms';

import {TestsContext} from '@context/testsContext';
import {timeStampToDate} from '@utils/formatDate';

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

const TestsList = () => {
  const tests: any = useContext(TestsContext);

  const handleSelectedTest = (test: any) => {
    tests?.setSelectedTest(test);
  };

  return (
    <>
      {/* {console.log('HELLO', tests)} */}
      {tests.datas &&
        tests?.datas?.map((test: any) => (
          <ListItem onClick={() => handleSelectedTest(test.id)}>
            <TestListInformation>
              <Typography variant="secondary">{test['id']}</Typography>
            </TestListInformation>
            <TestListInformation>
              <Typography variant="secondary">{test['script-type']}</Typography>
            </TestListInformation>
            <TestListInformation>
              <Typography variant="secondary">{timeStampToDate(test['end-time'])}</Typography>
            </TestListInformation>
            <TestListInformation>
              <RenderTestStatusSvgIcon testStatus={test.status} width={20} height={20} />
            </TestListInformation>
          </ListItem>
        ))}
    </>
  );
};

export default TestsList;
