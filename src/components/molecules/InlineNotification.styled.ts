import styled from 'styled-components';

import {Colors} from '@styles/Colors';

export const InlineNotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  border-radius: 4px;
  padding: 20px;

  a {
    font-weight: 500;
    text-decoration: underline;
    color: inherit;

    &:hover {
      text-decoration: none;
      color: inherit;
    }
  }

  &.error {
    background-color: ${Colors.pink700};

    .testkube-text.title {
      color: ${Colors.whitePure};
    }

    .testkube-text.description {
      color: ${Colors.whitePure};
    }
  }

  &.warning {
    background-color: ${Colors.amber90099};
    border: 1px solid ${Colors.amber400};

    .testkube-text.title {
      color: ${Colors.amber100};
    }

    .testkube-text.description {
      color: ${Colors.amber200};
    }
  }
`;
