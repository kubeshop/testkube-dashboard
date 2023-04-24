import React, {createContext, FC, PropsWithChildren, ReactElement, useContext, useMemo, useState} from 'react';
import {Modal} from '@custom-antd';

interface ModalConfig {
  width: number;
  title: string;
  content: ReactElement;
}

export interface ModalContextInterface {
  modalOpen: boolean;
  modalConfig: ModalConfig;
  setModalOpen: (open: boolean) => void;
  setModalConfig: (config: ModalConfig) => void;
}

const ModalContext = createContext<ModalContextInterface>(undefined!);

export const ModalHandler: FC<PropsWithChildren<{}>> = ({children}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    width: 500,
    title: '',
    content: <></>,
  });

  const value = useMemo(() => ({
    modalOpen,
    modalConfig,
    setModalOpen,
    setModalConfig,
  }), [modalOpen, modalConfig]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
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

export default ModalContext;
