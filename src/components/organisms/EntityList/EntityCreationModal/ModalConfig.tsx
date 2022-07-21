import {ModalConfigProps} from '@models/modal';

import TestSuiteCreationModalContent from './TestSuiteCreationModalContent';

export const TestSuiteModalConfig: ModalConfigProps = {
  title: 'Create a test suite',
  footer: null,
  width: 528,
  content: <TestSuiteCreationModalContent />,
};

export const TestModalConfig: ModalConfigProps = {
  title: 'Create a test',
  footer: null,
  width: 887,
  content: <div>ASasdasdasd</div>,
};
