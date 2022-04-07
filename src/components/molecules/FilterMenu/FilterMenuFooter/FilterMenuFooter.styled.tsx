import {Button, Space} from 'antd';

import styled from 'styled-components';

import Colors from '@styles/Colors';

const StyledButton = styled(Button)`
  height: 22px;
  padding: 0 8px;

  border-radius: 2px;

  font-size: 14px;
  text-align: center;
`;

export const StyledResetButton = styled(StyledButton)`
  border: 1px solid ${Colors.grey450};

  color: ${Colors.grey450};
  background: transparent;

  &:hover {
    border: 1px solid ${Colors.purple};

    color: ${Colors.grey450};
    background: ${Colors.purple};
  }

  &:focus {
    border: 1px solid ${Colors.purple};

    color: ${Colors.grey450};
    background: transparent;
  }
`;

export const StyledOkButton = styled(StyledButton)`
  border: 1px solid ${Colors.purple};

  color: ${Colors.grey450};
  background: ${Colors.purple};
  &:hover {
    border: 1px solid ${Colors.grey450};

    color: ${Colors.grey450};
    background: transparent;
  }

  &:focus {
    border: 1px solid ${Colors.grey450};

    color: ${Colors.grey450};
    background: ${Colors.purple};
  }
`;

export const StyledSpace = styled(Space)`
  padding: 4px 12px;

  border-top: 1px solid ${Colors.greyBorder};
`;
