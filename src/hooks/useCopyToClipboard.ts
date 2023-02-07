import {useEffect, useState} from 'react';

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

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isProcessed && isSecureContext) {
      timeout = copyToClipBoard();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isProcessed]);

  return {isCopied: isProcessed, setCopyToClipboardState: setProcessed};
};
