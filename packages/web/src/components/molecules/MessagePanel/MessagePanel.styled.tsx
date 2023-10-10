import styled from 'styled-components';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';
import {maxDevice} from '@styles/MediaQueries';

export const MessagePanelWrapper = styled.div`
  position: relative;

  display: flex;
  gap: 5px;

  padding: 20px 50px 20px 20px;

  @media ${maxDevice.tablet} {
    flex-direction: column;
  }

  &.default {
    background: ${Colors.indigo900};
    border: 1px solid ${Colors.indigo600};
    border-radius: 8px;
  }

  &.fullscreen {
    &.error {
      background: rgb(136 19 55 / 60%);
      border: 1px solid ${Colors.rose500};
      border-left: 0;
      border-right: 0;
    }

    &.warning {
      background: rgb(120 53 15 / 50%);
      border: 1px solid ${Colors.amber400};
      border-left: 0;
      border-right: 0;
    }
  }

  &.inline {
    &.error {
      background: rgb(136 19 55 / 60%);
      border: 1px solid ${Colors.rose500};
      border-radius: 4px;
    }

    &.warning {
      background: rgb(120 53 15 / 50%);
      border: 1px solid ${Colors.amber400};
      border-radius: 4px;
    }
  }
`;

export const MessageDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  gap: 5px;
`;

export const MessageDescriptionText = styled(Text)`
  a {
    font-weight: 500;
    text-decoration: underline;
    color: inherit;
  }
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;
