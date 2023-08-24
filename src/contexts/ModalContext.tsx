import React, {FC, PropsWithChildren, ReactElement, createContext, useContext, useMemo, useState} from 'react';

import {CustomModal as Modal} from '@custom-antd/Modal';

export interface ModalConfig {
  width: number;
  title: string;
  content: ReactElement;
  footer?: ReactElement;
  dataTestModalRoot?: string;
  dataTestCloseBtn?: string;
}

export interface ModalContextInterface {
  modalOpen: boolean;
  modalConfig: ModalConfig;
  setModalOpen: (open: boolean) => void;
  setModalConfig: (config: ModalConfig) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextInterface>(undefined!);

const defaultModalConfig = {
  width: 500,
  title: '',
  content: <></>,
};

export const ModalHandler: FC<PropsWithChildren<{}>> = ({children}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState(defaultModalConfig);

  const closeModal = () => {
    setModalOpen(false);
    setModalConfig(defaultModalConfig);
  };

  const value = useMemo(
    () => ({
      modalOpen,
      modalConfig,
      setModalOpen,
      setModalConfig,
      closeModal,
    }),
    [modalOpen, modalConfig]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const ModalOutlet: FC = () => {
  const {modalOpen, modalConfig, setModalOpen} = useContext(ModalContext);
  if (!modalOpen) {
    return null;
  }
  return (
    <Modal
      width={modalConfig.width}
      title={modalConfig.title}
      content={modalConfig.content}
      isModalVisible={modalOpen}
      setIsModalVisible={setModalOpen}
    />
  );
};

export const ModalOutletProvider: FC<PropsWithChildren<{}>> = ({children}) => (
  <>
    <ModalOutlet />
    {children}
  </>
);
