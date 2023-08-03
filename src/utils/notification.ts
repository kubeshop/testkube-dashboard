import {RTKResponse} from '@models/fetch';

import {notificationCall} from '@molecules';

export type DefaultRequestError = {
  title?: string;
  detail?: string;
  status?: number;
};

export const getErrorFromResponse = (res?: RTKResponse<unknown>): unknown => {
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

    return errorObject;
  }
};

export function displayDefaultNotificationFlow<T extends RTKResponse<any>>(
  res?: T
): T extends {error: any} ? never : T {
  const error = getErrorFromResponse(res);
  if (error) {
    throw error;
  }
  return res as any;
}

export function displayDefaultErrorNotification(err: DefaultRequestError) {
  const errorTitle = err?.title || 'Unknown error';
  const errorDetails = err?.detail || err || 'Something went wrong';

  if (err?.status !== 429) {
    notificationCall('failed', errorTitle, String(errorDetails));
  }
}
