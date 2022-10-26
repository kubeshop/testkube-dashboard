import {PageHeader} from 'antd';

import styled from 'styled-components';

export const EntityDetailsSkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px 32px;

  padding-top: 20px;
`;

export const StyledContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  gap: 40px;
  flex: 1;

  height: 100%;
  padding: 40px;
  padding-left: 1vw;
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
