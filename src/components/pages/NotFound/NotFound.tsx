import {useCallback, useContext} from 'react';

import {Button, Title} from '@custom-antd';

import notFoundImage from '@assets/not-found-image.svg';

import Colors from '@styles/Colors';

import {DashboardContext} from '@contexts';

import {StyledNotFoundContainer, StyledNotFoundDescription, StyledNotFoundImage} from './NotFound.styled';

const NotFound: React.FC = () => {
  const {navigate} = useContext(DashboardContext);

  const onButtonClick = useCallback(() => {
    navigate(-1);
  }, []);

  return (
    <StyledNotFoundContainer size={32}>
      <StyledNotFoundImage src={notFoundImage} preview={false} />
      <Title level={2} color={Colors.whitePure}>
        Page not found
      </Title>
      <StyledNotFoundDescription>We weren’t able to find the page you requested.</StyledNotFoundDescription>
      <Button type="primary" onClick={onButtonClick}>
        Back to the Dashboard
      </Button>
    </StyledNotFoundContainer>
  );
};

export default NotFound;
