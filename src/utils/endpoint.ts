import {sanitizeApiEndpoint} from '@services/apiEndpoint';

export const checkAPIEndpoint = (apiEndpoint: string, checkURLWorkingState: (apiEndpoint: string) => void) => {
  checkURLWorkingState(`${sanitizeApiEndpoint(apiEndpoint)}/info`);
};
