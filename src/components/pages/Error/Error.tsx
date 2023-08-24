import {FC, ReactNode} from 'react';
import {To} from 'react-router';

import {Image} from 'antd';

import notFoundImage from '@assets/not-found-image.svg';

import {Button, Title} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import Colors from '@styles/Colors';

import {StyledErrorContainer, StyledErrorDescription} from './Error.styled';

interface ErrorProps {
  title?: ReactNode;
  description?: ReactNode;
  buttonUrl?: To;
  buttonLabel?: ReactNode;
}

const Error: FC<ErrorProps> = ({title, description, buttonUrl, buttonLabel}) => {
  const back = useDashboardNavigate(buttonUrl ?? -1);
  return (
    <StyledErrorContainer size={32}>
      <Image src={notFoundImage} preview={false} />
      <Title level={2} color={Colors.whitePure}>
        {title || 'Error'}
      </Title>
      <StyledErrorDescription>{description || 'Sorry, something went wrong.'}</StyledErrorDescription>
      <Button type="primary" onClick={back}>
        {buttonLabel || 'Back to the previous page'}
      </Button>
    </StyledErrorContainer>
  );
};

export default Error;
