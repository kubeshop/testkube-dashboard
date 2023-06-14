import {useMemo} from 'react';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

const useExecutorIcon = (item: any) => {
  const executors = useAppSelector(selectExecutors);
  return useMemo(() => getTestExecutorIcon(executors, item?.type), [executors, item?.type]);
};

export default useExecutorIcon;
