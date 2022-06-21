import {Steps} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledSteps = styled(Steps)`
  &.testkube-steps {
    padding: 0px 60px 25px 60px;

    .ant-steps-item-process,
    .ant-steps-item-finish {
      .ant-steps-item-title {
        color: ${Colors.grey450};
      }

      .ant-steps-item-description {
        color: ${Colors.grey7};
      }
    }

    .ant-steps-item-process {
      .ant-steps-icon {
        color: ${Colors.grey1000};
      }
    }

    .ant-steps-item-wait {
      .ant-steps-item-title,
      .ant-steps-item-description {
        color: ${Colors.grey7};
      }
    }
  }
`;
