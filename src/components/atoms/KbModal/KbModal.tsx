import React from 'react';
import {Modal} from 'antd';
import styled from 'styled-components';

import {Image} from '@atoms';

import docsIcon from '@assets/docs.svg';

interface IModalButtonContent {
  modalTitle?: string;
  children: React.ReactNode;
}

const KbModal = ({modalTitle, children}: IModalButtonContent) => {
  const [visible, setVisible] = React.useState(false);

  const modalStyles = {
    backgroundColor: 'var(--color-dark-primary)',
    height: '150px',
  };

  const StyledModalWrapper = styled.div`
    margin-right: 10px;
  `;

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const StyledButton = styled.div`
    cursor: pointer;
  `;

  return (
    <StyledModalWrapper>
      <StyledButton>
        <Image src={docsIcon} alt="search tests" type="svg" width={30} height={30} onClick={showModal} />
      </StyledButton>
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        bodyStyle={modalStyles}
      >
        {children}
      </Modal>
    </StyledModalWrapper>
  );
};

export default KbModal;
