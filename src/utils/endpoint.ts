import {hasProtocol} from '@utils/strings';

export const checkAPIEndpoint = (apiEndpoint: string, checkURLWorkingState: (apiEndpoint: string) => void) => {
  const endsWithV1 = apiEndpoint.endsWith('/v1');

  if (hasProtocol(apiEndpoint)) {
    if (endsWithV1) {
      checkURLWorkingState(`${apiEndpoint}/info`);
    } else {
      checkURLWorkingState(`${apiEndpoint}/v1/info`);
    }
  } else {
    const targetProtocol = `${window.location.protocol}//`;

    if (endsWithV1) {
      checkURLWorkingState(`${targetProtocol}${apiEndpoint}/info`);
    } else {
      checkURLWorkingState(`${targetProtocol}${apiEndpoint}/v1/info`);
    }
  }
};
