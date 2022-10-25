import {ModalConfigProps} from '@models/modal';

import TestCreationModalContent from './TestCreationModalContent';
import TestSuiteCreationModalContent from './TestSuiteCreationModalContent';

export const TestSuiteModalConfig: ModalConfigProps = {
  title: 'Create a test suite',
  width: 528,
  content: <TestSuiteCreationModalContent />,
  dataTestCloseBtn: 'add-a-new-test-suite-modal-close-button',
  dataTestModalRoot: 'add-a-new-test-suite-modal',
};

export const TestModalConfig: ModalConfigProps = {
  title: 'Create a test',
  width: 880,
  content: <TestCreationModalContent />,
  dataTestCloseBtn: 'add-a-new-test-modal-close-button',
  dataTestModalRoot: 'add-a-new-test-modal',
};
