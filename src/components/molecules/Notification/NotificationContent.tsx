import {FC} from 'react';

import {Text} from '@custom-antd/Typography/Text';

import type {ErrorNotificationConfig} from '@models/notifications';

import {
  StyledNotificationContainer,
  StyledNotificationHeader,
  StyledNotificationMessage,
} from '@molecules/Notification.styled';

import {Colors} from '@styles/Colors';

type NotificationContentProps = {
  status: string;
} & ErrorNotificationConfig;

const statusBGColorMap: {[key: string]: string} = {
  passed: Colors.lime600,
  success: Colors.lime600,
  failed: Colors.pink700,
  error: Colors.pink700,
  warning: Colors.yellow400,
  info: Colors.sky600,
};

export const NotificationContent: FC<NotificationContentProps> = props => {
  const {status, title, message} = props;
  return (
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
  );
};
