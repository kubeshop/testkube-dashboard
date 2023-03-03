import {notification} from 'antd';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {StyledNotificationContainer, StyledNotificationHeader, StyledNotificationMessage} from './Notification.styled';

const statusBGColorMap: {[key: string]: string} = {
  passed: Colors.lime600,
  success: Colors.lime600,
  failed: Colors.pink700,
  error: Colors.pink700,
  warning: Colors.yellow400,
  info: Colors.sky600,
};

function notificationCall(status: string, title: string, message: string = '', duration: number = 4.5) {
  notification.open({
    message: null,
    placement: 'bottomRight',
    description: (
      <StyledNotificationContainer $bg={statusBGColorMap[status]}>
        <StyledNotificationHeader>
          <Text className="regular middle">{title}</Text>
        </StyledNotificationHeader>
        {message ? (
          <StyledNotificationMessage>
            <Text className="regular middle">{message}</Text>
          </StyledNotificationMessage>
        ) : null}
      </StyledNotificationContainer>
    ),
    closeIcon: <svg />,
    duration,
  });
}

export default notificationCall;
