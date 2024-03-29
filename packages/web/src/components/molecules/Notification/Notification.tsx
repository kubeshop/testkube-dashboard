import {notification} from 'antd';

import NotificationContent from './NotificationContent';

function notificationCall(status: string, title: string, message: string = '', duration: number = 4.5) {
  notification.open({
    message: null,
    placement: 'bottomRight',
    description: <NotificationContent status={status} title={title} message={message} />,
    closeIcon: <svg />,
    duration,
  });
}

export default notificationCall;
