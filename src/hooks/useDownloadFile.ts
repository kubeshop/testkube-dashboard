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
  };

  useEffect(() => {
    if (isProcessed) {
      downloadFile(textToCopy, options.filename);
    }
  }, [isProcessed, window]);

  return {isProcessed, setProcessed};
};
