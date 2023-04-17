import {Form} from 'antd';

import styled from 'styled-components';

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 7px 0;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TriggerItemContainer = styled.div<{$isTriggersAvailable: boolean}>`
  display: flex;
  flex-flow: row wrap;
  align-items: start;
  gap: 10px;

  width: 100%;
  ${({$isTriggersAvailable}) => ($isTriggersAvailable ? 'margin-bottom: 16px;' : null)};
`;

export const TriggerFormItem = styled(Form.Item)<{flex: number}>`
  ${props => (props.flex ? `flex: ${props.flex};` : '')}

  margin-bottom: 0;
  min-width: 150px;
`;

export const StyledTestOptionWrapper = styled.span`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 44px;
`;
