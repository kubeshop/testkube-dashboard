import {useMemo} from 'react';

import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {useExecutorsPick} from '@store/executors';

export const useExecutorIcon = (item: any) => {
  const {executors} = useExecutorsPick('executors');
  return useMemo(() => getTestExecutorIcon(executors || [], item?.type), [executors, item?.type]);
};
