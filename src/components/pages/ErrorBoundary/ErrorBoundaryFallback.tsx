import {FC, useContext} from 'react';

import notFoundImage from '@assets/not-found-image.svg';

import {ExternalLink} from '@atoms/ExternalLink';

import {ConfigContext} from '@contexts/ConfigContext';

import {Button} from '@custom-antd/Button';
import {Title} from '@custom-antd/Typography/Title';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {StyledErrorContainer, StyledErrorDescription, StyledErrorImage} from '@pages/ErrorBoundary.styled';

import {Colors} from '@styles/Colors';

export const ErrorBoundaryFallback: FC = () => {
  const {discordUrl} = useContext(ConfigContext);
  const back = useDashboardNavigate('/');

  return (
    <StyledErrorContainer size={32}>
      <StyledErrorImage src={notFoundImage} preview={false} />
      <Title level={2} color={Colors.whitePure}>
        An unexpected error occurred
      </Title>
      <StyledErrorDescription>
        We were notified about your error and will make sure to fix it as soon as possible. In the mean time you can try
        refreshing this page.
      </StyledErrorDescription>
      <StyledErrorDescription>
        Feel free to reach out to us on <ExternalLink href={discordUrl}>Discord</ExternalLink> if the error continuous
        to exist.
      </StyledErrorDescription>
      <Button type="primary" onClick={back}>
        Back to the Dashboard
      </Button>
    </StyledErrorContainer>
  );
};
