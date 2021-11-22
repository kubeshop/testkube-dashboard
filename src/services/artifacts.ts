import { config } from "@src/constants/config";

export const downloadFileName = (filename: string, executionId: string) => {
  const encodedFileName = encodeURIComponent(filename);
  return fetch(`${localStorage.getItem(config.apiEndpoint)}/${executionId}/artifacts/${encodedFileName}`).then(response => {
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
