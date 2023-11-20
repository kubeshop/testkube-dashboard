import React, {FC, PropsWithChildren, createContext, useContext, useMemo, useState} from 'react';

import {Modal} from '@custom-antd';

import {ModalConfig} from './types';

export interface ModalContextInterface {
  open: boolean;
  config: ModalConfig;
  setOpen: (open: boolean) => void;
  setConfig: (config: ModalConfig) => void;
}

const ModalContext = createContext<ModalContextInterface>(undefined!);

const defaultModalConfig = {
  width: 500,
  title: '',
  content: <></>,
};

export const ModalHandler: FC<PropsWithChildren<{}>> = ({children}) => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<ModalConfig>(defaultModalConfig);

  const value = useMemo(
    () => ({
      open,
      config,
      setOpen,
      setConfig,
    }),
    [open, config]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const ModalOutlet: FC = () => {
  const {open, config, setOpen} = useContext(ModalContext);
  if (!open) {
    return null;
  }
  return (
    <Modal
      width={config.width}
      title={config.title}
      content={config.content}
      dataTestModalRoot={config.dataTestModalRoot}
      dataTestCloseBtn={config.dataTestCloseBtn}
      isModalVisible={open}
      setIsModalVisible={setOpen}
    />
  );
};

export const ModalOutletProvider: FC<PropsWithChildren<{}>> = ({children}) => (
  <>
    <ModalOutlet />
    {children}
  </>
);

export default ModalContext;
