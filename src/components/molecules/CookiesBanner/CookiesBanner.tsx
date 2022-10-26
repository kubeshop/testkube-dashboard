import {Space} from 'antd';

import {Button, Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {StyledCookiesContainer} from './CookiesBanner.styled';
import {CookiesBannerProps} from './CookiesBanner.types';

const CookiesBanner: React.FC<CookiesBannerProps> = props => {
  const {onAcceptCookies, onDeclineCookies} = props;

  return (
    <StyledCookiesContainer data-test="cookies-banner-wrapper">
      <Space size={15} direction="vertical">
        <Text className="regular middle" color={Colors.slate50}>
          We use cookies to understand how users interact with Testkube by collecting and reporting information
          <strong> anonymously</strong>
        </Text>
        <Space size={15}>
          <Button onClick={onAcceptCookies} data-test="cookies-banner-accept-button">
            Accept Cookies
          </Button>
          <Button $customType="secondary" onClick={() => onDeclineCookies()} data-test="cookies-banner-decline-button">
            Decline
          </Button>
        </Space>
      </Space>
    </StyledCookiesContainer>
  );
};

export default CookiesBanner;
