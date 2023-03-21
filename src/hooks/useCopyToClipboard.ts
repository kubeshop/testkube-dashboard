import {useEffect, useState} from 'react';
import {useCopyToClipboard as _useCopyToClipboard} from 'react-use';

type CopyToClipboardOptions = {
  timeoutInMs?: number;
};

export const useCopyToClipboard = (textToCopy: string, options?: CopyToClipboardOptions) => {
  const [{value}, copyToClipboard] = _useCopyToClipboard();
  const [isProcessed, setProcessed] = useState(false);
  const timeoutInMs = options?.timeoutInMs ?? 2000;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isProcessed) {
      copyToClipboard(textToCopy);
      timeout = setTimeout(() => setProcessed(false), timeoutInMs);
    }

    return () => clearTimeout(timeout);
  }, [isProcessed]);

  return {isCopied: isProcessed, setCopyToClipboardState: setProcessed};
};
