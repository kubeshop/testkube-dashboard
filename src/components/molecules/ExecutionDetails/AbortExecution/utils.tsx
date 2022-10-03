import {ModalConfigProps} from '@models/modal';

import {useDeleteExecutionMutation} from '@services/tests';

import AbortExecutionModal from './AbortExecutionModal';

export const AbortExecutionModalConfig: ModalConfigProps = {
  title: 'Abort this execution',
  footer: null,
  content: <AbortExecutionModal useDeleteMutation={useDeleteExecutionMutation} />,
};
