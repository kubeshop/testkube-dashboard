import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "@src/app/hooks";
import { RenderTestStatusSvgIcon, TestTypeIcon, Typography } from "@src/components/atoms";
import { getDuration, timeStampToDate } from "@src/utils/formatDate";
import { memo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { selectedTestId, updateSelectedTestId } from "./testsListSlice";

const StyledTestListRow = styled.div`
 display: flex;
 align-items: center;
 flex-flow: row wrap;
 position: relative;
 transition: 0.5s;
 height: 50px;

 &:not(:first-child):hover {
   cursor: pointer;
   background: transparent linear-gradient(90deg, #1890fc 0%, #5bdad3 100%);
 }

 background: ${props =>
    props?.className?.includes('selected') ? 'transparent linear-gradient(90deg, #1890fc 0%, #5bdad3 100%)' : ''};
`;

const StyledTestListCell = styled.div`
  white-space: nowrap;

  &:nth-child(1) {
    width: calc(100% - 440px);
    padding-left: 20px;
  }

  &:nth-child(2) {
    width: 200px;
  }

  &:nth-child(3) {
    width: 100px;
  }

  &:nth-child(4) {
    width: 60px;
  }

  &:nth-child(5) {
    width: 60px;
    margin-right: 20px;
  }
`;
const Test = ({ index, item }: { index: number, item: any }) => {
  const testId = useAppSelector(selectedTestId);
  const dispatch = useDispatch();
  const handleSelectedTest = (id: string) => {
    dispatch(updateSelectedTestId(id));

  };
  return (
    <StyledTestListRow
      className={testId === item.id ? 'selected' : ''}
      key={nanoid()}
      onClick={() => handleSelectedTest(item.id)}
    >
      <StyledTestListCell role="cell">
        <Typography cursor='pointer' variant="secondary" color="secondary" font="light" leftAlign nowrap>
          {item.scriptName ? `${item.scriptName} - ${item.name}` : '-'}
        </Typography>
      </StyledTestListCell>
      <StyledTestListCell role="cell">
        <Typography cursor='pointer' variant="secondary" color="secondary" font="light" leftAlign>
          {item.startTime ? timeStampToDate(item.startTime) : '-'}
        </Typography>
      </StyledTestListCell>
      <StyledTestListCell role="cell">
        <Typography cursor='pointer' variant="secondary" color="secondary" font="light">
          {item.endTime ? getDuration(item.startTime, item.endTime) : '-'}
        </Typography>
      </StyledTestListCell>
      <StyledTestListCell role="cell">
        <RenderTestStatusSvgIcon testStatus={item.status} width={25} height={25} />
      </StyledTestListCell>
      <StyledTestListCell role="cell">
        <TestTypeIcon testType={item.scriptType} width={30} height={30} />
      </StyledTestListCell>
    </StyledTestListRow>
  );
};

function testPropsAreEqual(prevTest: any, nextTest: any) {
  return prevTest.item === nextTest.item
    && prevTest.index === nextTest.index;
}
export default memo(Test, testPropsAreEqual);
