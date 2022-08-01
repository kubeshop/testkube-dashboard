import {config} from '@constants/config';

export const downloadFileName = (filename: string, executionId: string) => {
  const encodedFileName = encodeURIComponent(filename);
  const doubleEncodedFileName = encodeURIComponent(encodedFileName);

  return fetch(
    `${localStorage.getItem(config.apiEndpoint)}/executions/${executionId}/artifacts/${doubleEncodedFileName}`
  ).then(response => {
    return response.blob().then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  });
};
