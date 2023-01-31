import {useEffect, useState} from 'react';

import {saveAs} from 'file-saver';

import useSecureContext from '@hooks/useSecureContext';

type CopyToClipboardOptions = {
  filename?: string;
  timeoutInMs?: number;
  notificationDuration?: number;
};

export const useCopyToClipboard = (textToCopy: string, options: CopyToClipboardOptions = {timeoutInMs: 2000}) => {
  const {timeoutInMs} = options;

  const [isProcessed, setProcessed] = useState(false);
  const isSecureContext = useSecureContext();

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(textToCopy);
    return setTimeout(() => {
      setProcessed(false);
    }, timeoutInMs);
  };

  const downloadFile = (content: string, filename: string = 'output.sh') => {
    const blob = URL.createObjectURL(new Blob([content], {type: 'text/plain;charset=utf-8'}));
    saveAs(blob, filename);
    return setTimeout(() => {
      setProcessed(false);
    }, timeoutInMs);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isProcessed) {
      if (isSecureContext) {
        timeout = copyToClipBoard();
      } else {
        timeout = downloadFile(textToCopy, options.filename);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isProcessed, window]);

  return {isCopied: isProcessed, setCopyToClipboardState: setProcessed};
};
