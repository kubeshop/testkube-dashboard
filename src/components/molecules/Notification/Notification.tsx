import {notification} from 'antd';

import {StatusIcon} from '@atoms';

import {Text} from '@custom-antd';

import {StyledNotificationContainer, StyledNotificationHeader, StyledNotificationMessage} from './Notification.styled';

function notificationCall(status: any, title: string, message: string = '') {
  notification.open({
    message: null,
    description: (
      <StyledNotificationContainer>
        <StyledNotificationHeader>
          <StatusIcon status={status} />
          <Text className="bold middle">{title}</Text>
        </StyledNotificationHeader>
        {message ? (
          <StyledNotificationMessage>
            <Text className="regular middle">{message}</Text>
          </StyledNotificationMessage>
        ) : null}
      </StyledNotificationContainer>
    ),
    closeIcon: <svg />,
  });
}

export default notificationCall;
