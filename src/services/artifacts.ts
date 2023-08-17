import {getApiEndpoint} from '@services/apiEndpoint';

import {getRtkBaseUrl, getRtkIdToken} from '@utils/rtk';

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
  const finalUrl = `${getApiEndpoint()}${getRtkBaseUrl(undefined)}${url}`;
  const idToken = await getRtkIdToken();

  // Call the API to retrieve file or signed URL
  let response = await fetch(`${finalUrl}?${new URLSearchParams(queryParams)}`, {
    headers: idToken ? {authorization: `Bearer ${idToken}`} : {},
  });

  // When the signed URL is returned, follow it
  if (response.headers.get('content-type') === 'application/json') {
    response = await fetch((await response.json()).data.url);
  }

  // Download the file
  const blobUrl = window.URL.createObjectURL(await response.blob());
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(blobUrl);
};

export const downloadArtifactArchive = async (fileName: string, executionId: string) => {
  const url = `/executions/${executionId}/artifact-archive`;
  const finalUrl = `${getApiEndpoint()}${getRtkBaseUrl(undefined)}${url}`;
  const idToken = await getRtkIdToken();

  // Call the API to retrieve file or signed URL
  let response = await fetch(finalUrl, {
    headers: idToken ? {authorization: `Bearer ${idToken}`} : {},
  });

  // When the signed URL is returned, follow it
  if (response.headers.get('content-type') === 'application/json') {
    response = await fetch((await response.json()).data.url);
  }

  // Download the file
  const blobUrl = window.URL.createObjectURL(await response.blob());
  const a = document.createElement('a');
  a.href = blobUrl;
  // tar.gz format for archive
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(blobUrl);
};
