import {getApiEndpoint} from '@services/apiEndpoint';

import {getRtkBaseUrl, getRtkIdToken} from '@utils/rtk';

const downloadFile = async (blob: Blob, fileName: string): Promise<void> => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
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

    await downloadFile(await response.blob(), fileName);
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

    await downloadFile(await response.blob(), fileName);
  } catch (error: any) {
    throw new Error(`Error on downloading the content: ${error.message}`);
  }
};
