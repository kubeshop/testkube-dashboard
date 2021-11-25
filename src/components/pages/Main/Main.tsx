import React from 'react';
import {Col, Row} from 'antd';
import {TestHeader, TestListTable} from '@organisms';
import {TestDescription} from '@src/components/molecules';
import {StyledMainContent, StyledTestHeader, StyledTestSummary} from './Main.styled';

const Main = () => {
  return (
    <>
      <StyledMainContent>
        <StyledTestHeader>
          <TestHeader testHeaderLabel="Tests" showTestFilters />
        </StyledTestHeader>
        <StyledTestSummary>
          <Row gutter={[16, 16]}>
            <Col span={12} >
              <TestListTable />
            </Col>
            <Col span={12} >
              <TestDescription />
            </Col>
          </Row>
        </StyledTestSummary>
      </StyledMainContent>
    </>
  );
};

export default Main;
