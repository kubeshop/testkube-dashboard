import {ModalConfigProps} from '@models/modal';

import {useDeleteTestSuiteMutation} from '@services/testSuites';
import {useDeleteTestMutation} from '@services/tests';

import DeleteModal from './DeleteModal';

export const TestDeleteModalConfig: ModalConfigProps = {
  title: 'Delete this test',
  footer: null,
  content: <DeleteModal useDeleteMutation={useDeleteTestMutation} />,
};

export const TestSuiteDeleteModalConfig: ModalConfigProps = {
  title: 'Delete this test suite',
  footer: null,
  content: <DeleteModal useDeleteMutation={useDeleteTestSuiteMutation} />,
};
