import {ModalConfigProps} from '@models/modal';

import TestSuiteCreationModalContent from './TestSuiteCreationModalContent';

type ModalConfig = (onConfirm?: () => void) => ModalConfigProps;

export const TestSuiteModalConfig: ModalConfig = () => {
  return {
    title: 'Create a test suite',
    footer: null,
    content: <TestSuiteCreationModalContent />,
  };
};

export const TestModalConfig: ModalConfig = () => {
  return {
    title: 'Create a test',
    footer: null,
    content: <div>ASasdasdasd</div>,
  };
};
