import {notificationCall} from '@molecules';

export function displayDefaultNotificationFlow(res: any, success?: () => void) {
  if (res.error) {
    if (res.error.data) {
      const errorTitle = res.error?.data?.title || 'Unknown error';
      const errorDetails = res.error?.data.detail || 'Something went wrong';
      notificationCall('failed', errorTitle, errorDetails);
    } else {
      notificationCall('failed', res.error.error);
    }
  } else {
    success && success();
  }
}

export function displayDefaultErrorNotification(err: any) {
  const errorTitle = err?.title || 'Unknown error';
  const errorDetails = err?.detail || err || 'Something went wrong';

  notificationCall('failed', errorTitle, String(errorDetails));
}
