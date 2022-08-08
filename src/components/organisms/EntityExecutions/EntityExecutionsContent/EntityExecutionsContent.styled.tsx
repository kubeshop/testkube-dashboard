import {PageHeader, Tabs} from 'antd';

import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;

  height: 100%;
  padding: 40px;

  overflow-y: auto;
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

export const ItemWrapper = styled.div`
  display: flex;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  margin-left: 15px;
`;

export const TabsWrapper = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 40px;
  }
`;

export const ItemRow = styled.div<{$flex: number}>`
  display: flex;
  align-items: center;
  flex: ${({$flex}) => $flex};
  justify-content: space-between;
`;

export const ItemColumn = styled.div`
  display: flex;
  gap: 16px;
`;
