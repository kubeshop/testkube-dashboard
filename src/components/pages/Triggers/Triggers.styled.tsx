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

export const TriggerItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  width: 100%;
  margin-bottom: 16px;
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
