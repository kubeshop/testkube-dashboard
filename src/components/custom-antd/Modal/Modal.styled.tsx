import {Modal} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 40px;

    background: ${Colors.slate900};
  }

  .ant-modal-header {
    padding: 0 0 40px;
    border-bottom: 0;

    background: ${Colors.slate900};
  }

  .ant-modal-body {
    padding: 0;
  }

  .ant-modal-title {
    color: ${Colors.slate50};
    font-size: 28px;
  }

  .ant-modal-close {
    color: ${Colors.slate500};
  }

  .ant-modal-footer {
    padding: 8px 24px 24px;
    border-top: 0;
  }
`;
