import {RTKResponse} from '@models/fetch';

import {notificationCall} from '@molecules';

export type DefaultRequestError = {
  title?: string;
  detail?: string;
  status?: number;
};

export function displayDefaultNotificationFlow<T = unknown>(res?: RTKResponse<T>, success?: () => void) {
  if (res && 'error' in res && 'data' in res.error) {
    if (res.error.data) {
      // @ts-ignore
      const errorTitle = res.error.data?.title || 'Unknown error';
      // @ts-ignore
      const errorDetails = res.error.data?.detail || 'Something went wrong';

      notificationCall('failed', errorTitle, errorDetails);
    } else if ('error' in res.error) {
      notificationCall('failed', res.error.error);
    }
  } else {
    success && success();
  }
}

export function displayDefaultErrorNotification(err: DefaultRequestError) {
  const errorTitle = err?.title || 'Unknown error';
  const errorDetails = err?.detail || err || 'Something went wrong';

  if (err?.status !== 429) {
    notificationCall('failed', errorTitle, String(errorDetails));
  }
}
