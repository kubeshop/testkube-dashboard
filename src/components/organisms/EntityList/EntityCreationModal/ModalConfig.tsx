import {ModalConfigProps} from '@models/modal';

import TestCreationModalContent from './TestCreationModalContent';
import TestSuiteCreationModalContent from './TestSuiteCreationModalContent';

export const TestSuiteModalConfig: ModalConfigProps = {
  title: 'Create a test suite',
  width: 528,
  content: <TestSuiteCreationModalContent />,
};

export const TestModalConfig: ModalConfigProps = {
  title: 'Create a test',
  width: 880,
  content: <TestCreationModalContent />,
};
