import {getApiEndpoint} from '@services/apiEndpoint';

import {getRtkBaseUrl, getRtkIdToken} from '@utils/rtk';

const downloadFromUrl = (url: string, fileName: string): void => {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const downloadPotentialFile = async (response: Response, fileName: string): Promise<void> => {
  if (!response.status || response.status >= 300) {
    throw new Error('Something went wrong');
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = await response.json();
    const fileUrl = data.data?.url || data.url;
    downloadFromUrl(fileUrl, fileName);
  } else {
    const fileUrl = window.URL.createObjectURL(await response.blob());
    downloadFromUrl(fileUrl, fileName);
    window.URL.revokeObjectURL(fileUrl);
  }
};

export const downloadArtifact = async (
  fileName: string,
  executionId: string,
  testName?: string,
  testSuiteName?: string
) => {
  // Build URL
  const encodedFileName = encodeURIComponent(fileName);
  const doubleEncodedFileName = encodeURIComponent(encodedFileName);
  const queryParams = {
    ...(testName && {testName}),
    ...(testSuiteName && {testSuiteName}),
  };
  const url = `/executions/${executionId}/artifacts/${doubleEncodedFileName}`;
  const finalUrl = `${getApiEndpoint()}${getRtkBaseUrl('environment')}${url}`;
  const idToken = await getRtkIdToken();

  // Call the API to retrieve file or signed URL
  const response = await fetch(`${finalUrl}?${new URLSearchParams(queryParams)}`, {
    headers: idToken ? {authorization: `Bearer ${idToken}`} : {},
  });

  // Download the file
  await downloadPotentialFile(response, fileName);
};

export const downloadArtifactArchive = async (fileName: string, executionId: string) => {
  const url = `/executions/${executionId}/artifact-archive`;
  const finalUrl = `${getApiEndpoint()}${getRtkBaseUrl(undefined)}${url}`;
  const idToken = await getRtkIdToken();

  // Call the API to retrieve file or signed URL
  const response = await fetch(finalUrl, {
    headers: idToken ? {authorization: `Bearer ${idToken}`} : {},
  });

  // Download the file
  await downloadPotentialFile(response, fileName);
};
