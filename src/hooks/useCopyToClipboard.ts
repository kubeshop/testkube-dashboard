import {useEffect, useState} from 'react';

import {saveAs} from 'file-saver';

import Timeout from '@organisms/EntityDetails/EntityDetailsContent/Settings/SettingsGeneral/Timeout';

import useSecureContext from '@hooks/useSecureContext';

type CopyToClipboardOptions = {
  filename?: string;
  timeoutInMs?: number;
  notificationDuration?: number;
};

export const useCopyToClipboard = (textToCopy: string, options: CopyToClipboardOptions = {timeoutInMs: 2000}) => {
  const {timeoutInMs} = options;

  const [isCopied, setCopyToClipboardState] = useState(false);
  const isSecureContext = useSecureContext();

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(textToCopy);
    return setTimeout(() => {
      setCopyToClipboardState(false);
    }, timeoutInMs);
  };

  const downloadFile = (content: string) => {
    const blob = URL.createObjectURL(new Blob([content], {type: 'text/plain;charset=utf-8'}));
    saveAs(blob, 'output.log');
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isCopied) {
      if (isSecureContext) {
        timeout = copyToClipBoard();
      } else {
        downloadFile(textToCopy);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isCopied]);

  return {isCopied, setCopyToClipboardState};
};
