import {Steps} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledSteps = styled(Steps)`
  &.testkube-steps {
    padding: 0px 60px 25px 60px;

    .ant-steps-item-process,
    .ant-steps-item-finish {
      .ant-steps-item-title {
        font-family: 'Nunito';
        color: ${Colors.grey450};
      }

      .ant-steps-item-description {
        font-family: 'Nunito';
        color: ${Colors.grey7};
      }
    }

    .ant-steps-item-process > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after,
    .ant-steps-item-wait > .ant-steps-item-container > .ant-steps-item-content > .ant-steps-item-title::after {
      background: ${Colors.greyHover};
    }

    .ant-steps-item-process {
      .ant-steps-icon {
        font-family: 'Nunito';
        color: ${Colors.grey1000};
      }
    }

    .ant-steps-item-wait {
      .ant-steps-item-title,
      .ant-steps-item-description {
        font-family: 'Nunito';
        color: ${Colors.grey7};
      }
    }
  }
`;
