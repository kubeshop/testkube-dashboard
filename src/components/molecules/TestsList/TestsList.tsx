import React, {useContext} from 'react';
import styled from 'styled-components';

import {RenderTestStatusSvgIcon, Typography, TestTypeIcon} from '@atoms';

import {TestsContext} from '@context/testsContext';
import {timeStampToDate, getDuration} from '@utils/formatDate';

const StyledListTestTable = styled.table`
  border: none;
  width: 100%;
`;

const StyledTableHead = styled.tr`
  border: none;
`;

const StyledTableHeadCell = styled.th`
  border: none;
  width: 20%;
`;

const StyledTableDataCell = styled.tr`
  border: none;

  & > td {
    text-align: center;
    vertical-align: middle;
  }

  &:hover {
    cursor: pointer;
    background: transparent linear-gradient(90deg, #1890fc 0%, #5bdad3 100%);
  }
`;

const StyledTableDataCellTest = styled.td`
  border: none;
  width: 25%;
`;

const TestsList = () => {
  const tests: any = useContext(TestsContext);

  const handleSelectedTest = (test: any) => {
    tests?.setSelectedTest(test);
  };

  return (
    <StyledListTestTable>
      <StyledTableHead>
        <StyledTableHeadCell>
          <Typography variant="secondary" font="bold">
            Name
          </Typography>
        </StyledTableHeadCell>
        <StyledTableHeadCell>
          <Typography variant="secondary" font="bold">
            Ended at
          </Typography>
        </StyledTableHeadCell>
        <StyledTableHeadCell>
          <Typography variant="secondary" font="bold">
            Duration
          </Typography>
        </StyledTableHeadCell>
        <StyledTableHeadCell>
          <Typography variant="secondary" font="bold">
            Status
          </Typography>
        </StyledTableHeadCell>
        <StyledTableHeadCell>
          <Typography variant="secondary" font="bold">
            Type
          </Typography>
        </StyledTableHeadCell>
      </StyledTableHead>
      {tests.datas &&
        tests?.datas?.map((test: any) => (
          <StyledTableDataCell onClick={() => handleSelectedTest(test.id)}>
            <StyledTableDataCellTest>
              <Typography variant="secondary" font="light">
                {test['script-name']}
              </Typography>
            </StyledTableDataCellTest>
            <StyledTableDataCellTest>
              <Typography variant="secondary" font="light">
                {test['end-time'] ? timeStampToDate(test['end-time']) : '-'}
              </Typography>
            </StyledTableDataCellTest>
            <StyledTableDataCellTest>
              <Typography variant="secondary" font="light">
                {test['end-time'] ? getDuration(test['end-time']) : '-'}
              </Typography>
            </StyledTableDataCellTest>
            <StyledTableDataCellTest>
              <RenderTestStatusSvgIcon testStatus={test.status} width={25} height={25} />
            </StyledTableDataCellTest>
            <StyledTableDataCellTest>
              <TestTypeIcon testType={test['script-type']} width={25} height={25} />
            </StyledTableDataCellTest>
          </StyledTableDataCell>
        ))}
    </StyledListTestTable>
  );
};

export default TestsList;
