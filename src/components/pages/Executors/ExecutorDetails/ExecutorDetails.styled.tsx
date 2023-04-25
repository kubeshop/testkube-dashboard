import {PageHeader} from 'antd';

import styled from 'styled-components';

export const StyledPageHeader = styled(PageHeader)`
  &.testkube-pageheader {
    &.ant-page-header {
      padding: 0;

      .ant-page-header-heading-left,
      .ant-page-header-heading-extra {
        margin: 0;
      }
    }
  }
`;

export const StyledContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;

  height: 100%;
  padding: 30px 30px 0 0;
`;
