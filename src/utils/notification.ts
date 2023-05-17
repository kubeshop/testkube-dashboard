import {RTKResponse} from '@models/fetch';
import {ErrorNotificationConfig} from '@models/notifications';

import {notificationCall} from '@molecules';

export type DefaultRequestError = {
  title?: string;
  detail?: string;
  status?: number;
};

export function defaultNotificationFlow<T = unknown>(
  res?: RTKResponse<T>,
  success?: () => void,
  fail?: (error: ErrorNotificationConfig) => void
): {title: string; message?: string} | null {
  if (res && 'error' in res) {
    let errorObject = null;

    if ('data' in res.error) {
      // @ts-ignore
      const errorTitle = res.error.data?.title || 'Unknown error';
      // @ts-ignore
      const errorDetails = res.error.data?.detail || 'Something went wrong';

      errorObject = {
        title: errorTitle,
        message: errorDetails,
      };
    } else if ('error' in res.error) {
      errorObject = {
        // @ts-ignore
        title: res?.error?.error,
      };
    }

    if (errorObject) {
      fail?.(errorObject);
    }
    return errorObject;
  }

  success?.();
  return null;
}

export function displayDefaultErrorNotification(err: DefaultRequestError) {
  const errorTitle = err?.title || 'Unknown error';
  const errorDetails = err?.detail || err || 'Something went wrong';

  if (err?.status !== 429) {
    notificationCall('failed', errorTitle, String(errorDetails));
  }
}
