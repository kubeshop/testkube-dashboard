import {FC, ReactNode, useCallback, useContext} from 'react';
import {To} from 'react-router';

import {Image} from 'antd';

import notFoundImage from '@assets/not-found-image.svg';

import {DashboardContext} from '@contexts';

import {Button, Title} from '@custom-antd';

import Colors from '@styles/Colors';

import {StyledErrorContainer, StyledErrorDescription} from './Error.styled';

interface ErrorProps {
  title?: ReactNode;
  description?: ReactNode;
  buttonUrl?: To;
  buttonLabel?: ReactNode;
}

const Error: FC<ErrorProps> = ({title, description, buttonUrl, buttonLabel}) => {
  const {navigate} = useContext(DashboardContext);

  const onButtonClick = useCallback(() => {
    if (buttonUrl == null) {
      navigate(-1);
    } else {
      navigate(buttonUrl);
    }
  }, [buttonUrl]);

  return (
    <StyledErrorContainer size={32}>
      <Image src={notFoundImage} preview={false} />
      <Title level={2} color={Colors.whitePure}>
        {title || 'Error'}
      </Title>
      <StyledErrorDescription>{description || 'Sorry, something went wrong.'}</StyledErrorDescription>
      <Button type="primary" onClick={onButtonClick}>
        {buttonLabel || 'Back to the previous page'}
      </Button>
    </StyledErrorContainer>
  );
};

export default Error;
