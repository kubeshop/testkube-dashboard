import {useEffect, useState} from 'react';

type CopyToClipboardOptions = {
  timeoutInMs?: number;
  notificationDuration?: number;
};

export const useCopyToClipboard = (textToCopy: string, options: CopyToClipboardOptions = {timeoutInMs: 2000}) => {
  const {timeoutInMs} = options;

  const [isCopied, setCopyToClipboardState] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isCopied) {
      if (window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy);
      }
      timeout = setTimeout(() => {
        setCopyToClipboardState(false);
      }, timeoutInMs);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied]);

  return {isCopied, setCopyToClipboardState};
};
