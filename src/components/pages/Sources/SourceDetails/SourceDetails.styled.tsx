import {PageHeader} from 'antd';

import styled from 'styled-components';

export const StyledPageHeader = styled(PageHeader)`
  &.testkube-pageheader {
    margin-bottom: 20px;

    &.ant-page-header {
      padding: 0;

      .ant-page-header-heading-left,
      .ant-page-header-heading-extra {
        margin: 0;
      }
    }
  }
`;
