import styled from 'styled-components';

import {FullWidthSpace} from '@custom-antd';

import Colors from '@styles/Colors';

export const DecayingContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  &::after {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
    z-index: 2;
    background: linear-gradient(180deg, transparent 0%, ${Colors.mainBackground} 85%);
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;

  svg {
    max-width: 100%;
    height: auto;
  }
`;

export const ContentContainer = styled(FullWidthSpace)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: -70px;
  z-index: 2;

  .ant-typography {
    display: block;
    max-width: 300px;
  }
`;

export const HelpContainer = styled.div`
  margin-top: 50px;
  width: 600px;
  max-width: calc(100vw - 80px);
`;
