import {useEffect, useState} from 'react';

import {saveAs} from 'file-saver';

type DownloadOptions = {
  filename?: string;
};

export const useDownloadFile = (textToCopy: string, options: DownloadOptions) => {
  const [isProcessed, setProcessed] = useState(false);

  const downloadFile = (content: string, filename: string = 'output.sh') => {
    const blob = URL.createObjectURL(new Blob([content], {type: 'text/plain;charset=utf-8'}));
    saveAs(blob, filename);
    return setTimeout(() => {
      setProcessed(false);
    }, 3000);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isProcessed) {
      timeout = downloadFile(textToCopy, options.filename);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isProcessed]);

  return {isProcessed, setProcessed};
};
