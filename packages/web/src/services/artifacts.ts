import {getApiEndpoint} from '@services/apiEndpoint';

import {getRtkBaseUrl, getRtkIdToken} from '@utils/rtk';

export const fetchContentFromSignedURL = async (signedURL: string): Promise<Blob> => {
  const response = await fetch(signedURL);

  if (!response.ok) {
    throw new Error(`Failed to fetch content from signed URL: ${response.status} ${response.statusText}`);
  }

  return response.blob();
};

const getResponseFileUrlAndDownloadContent = async (response: Response, fileName: string) => {
  if (!response.status || response.status >= 300) {
    throw new Error('Something went wrong');
  }

  if (response.headers.get('content-type') === 'application/json') {
    const data = await response.json();
    const fileUrl = data.data?.url || data.url;
    await downloadFile(fileUrl, fileName);
    return;
  }

  const fileUrl = window.URL.createObjectURL(await response.blob());
  await downloadFile(fileUrl, fileName);
  URL.revokeObjectURL(fileUrl);
};

const downloadFile = async (signedURL: string, fileName: string): Promise<void> => {
  try {
    const content = await fetchContentFromSignedURL(signedURL);
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error: any) {
    throw new Error(`Error on opening the file: ${error.message}`);
  }
};

export const downloadArtifact = async (
  fileName: string,
  executionId: string,
  testName?: string,
  testSuiteName?: string
): Promise<void> => {
  try {
    const queryParams = new URLSearchParams({
      ...(testName && {testName}),
      ...(testSuiteName && {testSuiteName}),
    });
    const url = `/executions/${executionId}/artifacts/${encodeURIComponent(fileName)}`;
    const response = await fetch(`${getApiEndpoint()}${getRtkBaseUrl('environment')}${url}?${queryParams}`, {
      headers: {authorization: `Bearer ${await getRtkIdToken()}`},
    });

    if (!response.ok) {
      throw new Error(`Failed to download artifact: ${response.status} ${response.statusText}`);
    }

    await getResponseFileUrlAndDownloadContent(response, fileName);
  } catch (error: any) {
    throw new Error(`Error on downloading the content: ${error.message}`);
  }
};

export const downloadArtifactArchive = async (fileName: string, executionId: string): Promise<void> => {
  try {
    const url = `/executions/${executionId}/artifact-archive`;
    const response = await fetch(`${getApiEndpoint()}${getRtkBaseUrl('environment')}${url}`, {
      headers: {authorization: `Bearer ${await getRtkIdToken()}`},
    });

    if (!response.ok) {
      throw new Error(`Failed to download artifact archive: ${response.status} ${response.statusText}`);
    }

    await getResponseFileUrlAndDownloadContent(response, fileName);
  } catch (error: any) {
    throw new Error(`Error on downloading the content: ${error.message}`);
  }
};
