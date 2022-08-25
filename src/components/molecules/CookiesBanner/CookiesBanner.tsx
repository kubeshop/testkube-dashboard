import {Space} from 'antd';

import {Button, Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {StyledCookiesContainer} from './CookiesBanner.styled';
import {CookiesBannerProps} from './CookiesBanner.types';

const CookiesBanner: React.FC<CookiesBannerProps> = props => {
  const {onAcceptCookies, onDeclineCookies} = props;

  return (
    <StyledCookiesContainer>
      <Space size={15} direction="vertical">
        <Text className="regular middle" color={Colors.slate50}>
          We use cookies to understand how users interact with Testkube by collecting and reporting information
          <strong> anonymously</strong>
        </Text>
        <Space size={15}>
          <Button onClick={onAcceptCookies}>Accept Cookies</Button>
          <Button $customType="secondary" onClick={() => onDeclineCookies()}>
            Decline
          </Button>
        </Space>
      </Space>
    </StyledCookiesContainer>
  );
};

export default CookiesBanner;
