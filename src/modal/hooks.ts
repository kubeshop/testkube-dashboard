import {useContext} from 'react';

import {useLastCallback} from '@hooks/useLastCallback';

import ModalContext from './context';
import {ModalConfig, ModalController} from './types';

export const useModal = (config?: ModalConfig): ModalController => {
  const {setOpen, setConfig, open: currentOpen, config: currentConfig} = useContext(ModalContext);
  const isCurrent = !config || config.title === currentConfig?.title;

  const open = useLastCallback(() => {
    if (!config) {
      throw new Error('Cannot open not specified modal.');
    }
    setConfig(config);
    setOpen(true);
  });
  const close = useLastCallback(() => {
    if (isCurrent) {
      setOpen(false);
    }
  });
  return {open, close, active: isCurrent && currentOpen};
};
