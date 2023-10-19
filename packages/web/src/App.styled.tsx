import {Layout} from 'antd';

import styled from 'styled-components';

import DecayingMessagePanelList from '@molecules/DecayingMessagePanelList';

export const StyledLayoutContentWrapper = styled(Layout)`
  overflow: hidden;
`;

export const BannerList = styled(DecayingMessagePanelList)`
  padding: 20px 30px 0 0;
`;
