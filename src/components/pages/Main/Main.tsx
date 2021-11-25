import React from 'react';
import {Col, Row} from 'antd';
import {TestHeader, TestListTable} from '@organisms';
import {TestDescription} from '@src/components/molecules';
import {StyledMainContent, StyledTestHeader, StyledTestSummary} from './Main.styled';

const Main = () => {
  return (
    <>
      <StyledMainContent>
          <Row>
            <Col flex="55%">
              <StyledTestHeader>
                <TestHeader testHeaderLabel="Tests" showTestFilters />
              </StyledTestHeader>
              <StyledTestSummary>
                  <TestListTable />
              </StyledTestSummary>
            </Col>
            <Col flex="auto">
              <TestDescription />
            </Col>
          </Row>
      </StyledMainContent>
    </>
  );
};

export default Main;
