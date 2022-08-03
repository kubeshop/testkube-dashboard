import {useEffect, useState} from 'react';

import {notification} from 'antd';

type CopyToClipboardOptions = {
  timeoutInMs?: number;
  notificationDuration?: number;
};

export const useCopyToClipboard = (
  textToCopy: string,
  options: CopyToClipboardOptions = {timeoutInMs: 1500, notificationDuration: 1.5}
) => {
  const {timeoutInMs, notificationDuration} = options;

  const [isCopied, setCopyToClipboardState] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isCopied) {
      navigator.clipboard.writeText(textToCopy);
      notification.info({message: null, description: 'Copied', duration: notificationDuration});
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
