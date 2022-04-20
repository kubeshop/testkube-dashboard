import {Button, Space} from 'antd';

import Colors from '@styles/Colors';

import {StyledCookiesButton, StyledCookiesContainer, StyledCookiesDisclaimer} from './CookiesBanner.styled';

type CookiesBannerProps = {
  onAcceptCookies: () => void;
  onDeclineCookies: () => void;
};

const CookiesBanner: React.FC<CookiesBannerProps> = props => {
  const {onAcceptCookies, onDeclineCookies} = props;

  return (
    <StyledCookiesContainer>
      <Space size={15}>
        <StyledCookiesDisclaimer>
          We use cookies to understand how users interact with Testkube by collecting and reporting information
          <strong> anonymously</strong>
        </StyledCookiesDisclaimer>
        <StyledCookiesButton size="large" onClick={onAcceptCookies}>
          Accept Cookies
        </StyledCookiesButton>
        <Button size="large" ghost type="text" style={{color: Colors.whitePure}} onClick={onDeclineCookies}>
          Decline
        </Button>
      </Space>
    </StyledCookiesContainer>
  );
};

export default CookiesBanner;
