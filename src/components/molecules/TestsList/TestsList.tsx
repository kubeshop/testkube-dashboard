import React from 'react';
import styled from 'styled-components';

import {Typography} from '@atoms';

const ListItem = styled.div`
  display: flex;
  overflow: hidden;
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
  return (
    <ListItem>
      <TestListInformation>
        <Typography variant="secondary">Test Name</Typography>
      </TestListInformation>
      <TestListInformation>
        <Typography variant="secondary">Test Type</Typography>
      </TestListInformation>
      <TestListInformation>
        <Typography variant="secondary">Test TimeStamp</Typography>
      </TestListInformation>
      <TestListInformation>
        <Typography variant="secondary">Test Status</Typography>
      </TestListInformation>
    </ListItem>
  );
};

export default TestsList;
