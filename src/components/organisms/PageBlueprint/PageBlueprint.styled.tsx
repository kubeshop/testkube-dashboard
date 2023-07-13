import {PageHeader as AntdPageHeader} from 'antd';

import styled from 'styled-components';

export const PageWrapper = styled.div<{$isOss?: boolean}>`
  overflow: ${({$isOss}) => ($isOss ? 'hidden' : 'auto')};

  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;

  padding: 30px 30px 60px 0;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ToolbarContent = styled.div``;

export const ToolbarExtra = styled.div`
  margin-left: auto;
`;

export const StyledPageHeader = styled(AntdPageHeader)`
  &.ant-page-header {
    margin-bottom: 12px;
    padding: 0;

    .ant-page-header-heading-left,
    .ant-page-header-heading-extra {
      margin: 0;
    }
  }
`;
