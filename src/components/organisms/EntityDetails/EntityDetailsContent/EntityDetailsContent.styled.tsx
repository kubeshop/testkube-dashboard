import {PageHeader, Tabs} from 'antd';

import styled from 'styled-components';

export const StyledContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;

  height: 100%;
  padding: 40px;
`;

export const StyledPageHeader = styled(PageHeader)`
  &.testkube-pageheader {
    &.ant-page-header {
      padding: 0px;

      .ant-page-header-heading-left,
      .ant-page-header-heading-extra {
        margin: 0;
      }
    }
  }
`;

export const TabsWrapper = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 40px;
  }
`;
