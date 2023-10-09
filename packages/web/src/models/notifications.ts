export type ErrorNotificationConfig = {
  title: string;
  message?: string | undefined;
};

export type ErrorNotification = ErrorNotificationConfig | {errors: ErrorNotificationConfig[]};
