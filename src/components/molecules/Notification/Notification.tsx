import {notification} from 'antd';

import {StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import {StyledNotificationContainer, StyledNotificationHeader, StyledNotificationMessage} from './Notification.styled';

function notificationCall(title: string, message: string, status: any) {
  notification.open({
    message: null,
    description: (
      <StyledNotificationContainer>
        <StyledNotificationHeader>
          <StatusIcon status={status} />
          <Text className="bold middle">{title}</Text>
        </StyledNotificationHeader>
        <StyledNotificationMessage>
          <Text className="regular middle">{message}</Text>
        </StyledNotificationMessage>
      </StyledNotificationContainer>
    ),
    closeIcon: <svg />,
  });
}

export default notificationCall;
