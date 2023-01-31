export const getStatus = (status: string): string => {
  switch (status) {
    case 'success':
      return 'passed';
    case 'error':
      return 'failed';
    default:
      return status;
  }
};
