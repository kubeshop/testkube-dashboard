import {getApiEndpoint} from '@services/apiEndpoint';

import {getRtkBaseUrl, getRtkIdToken} from '@utils/rtk';

export const getApiResponse = async (
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

  return response;
};

export const getResponsefileUrl = async (response: Response) => {
  if (!response.status || response.status >= 300) {
    throw new Error('Something went wrong');
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = await response.json();
    const fileUrl = data.data?.url || data.url;
    return fileUrl;
  }

  const fileUrl = window.URL.createObjectURL(await response.blob());
  return fileUrl;
};

export const fetchContentFromSignedURL = async (signedURL: string): Promise<Blob> => {
  const response = await fetch(signedURL);

  if (!response.ok) {
    throw new Error(`Failed to fetch content from signed URL: ${response.status} ${response.statusText}`);
  }

  return response.blob();
};

const downloadFromBlobURL = async (signedURL: string, fileName: string): Promise<void> => {
  try {
    const content = await fetchContentFromSignedURL(signedURL);
    const url = URL.createObjectURL(content);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error: any) {
    throw new Error(`Error on downloading the content: ${error.message}`);
  }
};

const downloadPotentialFile = async (response: Response, fileName: string): Promise<void> => {
  const fileUrl = await getResponsefileUrl(response);
  downloadFromBlobURL(fileUrl, fileName);
};

export const downloadArtifact = async (
  fileName: string,
  executionId: string,
  testName?: string,
  testSuiteName?: string
): Promise<void> => {
  const response = await getApiResponse(fileName, executionId, testName, testSuiteName);
  downloadPotentialFile(response, fileName);
};

export const downloadArtifactArchive = async (fileName: string, executionId: string): Promise<void> => {
  const url = `/executions/${executionId}/artifact-archive`;
  const finalUrl = `${getApiEndpoint()}${getRtkBaseUrl('environment')}${url}`;
  const idToken = await getRtkIdToken();

  // Call the API to retrieve file or signed URL
  const response = await fetch(finalUrl, {
    headers: idToken ? {authorization: `Bearer ${idToken}`} : {},
  });

  // Download the file
  await downloadPotentialFile(response, fileName);
};
