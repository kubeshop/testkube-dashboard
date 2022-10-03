import {ModalConfigProps} from '@models/modal';

import TestUpdateModalContent from './TestUpdateModalContent';
import TestSuiteUpdateModalContent from './TestSuiteUpdateModalContent';

export const TestSuiteModalConfig: ModalConfigProps = {
  title: 'Update test',
  footer: null,
  width: 528,
  content: <TestSuiteUpdateModalContent />,
};

export const TestModalConfig: ModalConfigProps = {
  title: 'Update test',
  footer: null,
  width: 880,
  content: <TestUpdateModalContent />,
};
