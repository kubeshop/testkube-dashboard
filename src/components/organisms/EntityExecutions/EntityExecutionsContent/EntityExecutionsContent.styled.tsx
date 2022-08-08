import {PageHeader, Tabs} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

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

export const SummaryGridWrapper = styled.div<{$gridCols: number}>`
  display: grid;
  grid-template-columns: repeat(${({$gridCols}) => $gridCols}, 1fr);
  gap: 12px;
`;

export const SummaryGridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100px;
  padding: 20px;
  border-radius: 4px;

  background: ${Colors.slate800};

  transition: 0.3s;

  &:hover {
    background: ${Colors.slate800halfalpha};
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
