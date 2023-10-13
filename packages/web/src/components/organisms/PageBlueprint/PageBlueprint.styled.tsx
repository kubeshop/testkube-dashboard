import {PageHeader as AntdPageHeader} from 'antd';

import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
  width: 100%;

  padding: 30px 30px 60px 0;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
`;

export const ToolbarContent = styled.div``;

export const ToolbarExtra = styled.div`
  margin-left: auto;
`;

export const StyledPageHeader = styled(AntdPageHeader)`
  &.ant-page-header {
    margin-bottom: 12px;
    padding: 0;

    .ant-page-header-heading {
      gap: 20px;
    }

    .ant-page-header-heading-left,
    .ant-page-header-heading-extra {
      margin: 0;
    }
  }
`;

export const PageTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  flex: 1;
`;
