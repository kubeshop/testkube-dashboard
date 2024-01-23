import {useCallback, useMemo, useRef, useState} from 'react';

import {ItemType} from 'antd/lib/menu/hooks/useItems';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import useInViewport from '@hooks/useInViewport';
import useRunEntity from '@hooks/useRunEntity';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {ActionsDropdownProps} from '@models/actionsDropdown';
import {ExecutionMetrics} from '@models/metrics';

import DotsDropdown from '@molecules/DotsDropdown';
import {notificationCall} from '@molecules/Notification';

import {useAbortAllTestExecutionsMutation, useGetTestExecutionMetricsQuery} from '@services/tests';

import {PollingIntervals} from '@utils/numbers';

const TestActionsDropdown: React.FC<ActionsDropdownProps> = props => {
  const {name, namespace, outOfSync, type} = props;

  const [abortAllTestExecutions] = useAbortAllTestExecutionsMutation();

  const isSystemAvailable = useSystemAccess(SystemAccess.system);

  const [open, setOpen] = useState(false);

  const editNavigate = useDashboardNavigate(() => `/tests/${name}/settings/test`);

  const [, run] = useRunEntity('tests', {
    name,
    namespace,
    type,
  });

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics, refetch} = useGetTestExecutionMetricsQuery(
    {id: name, last: 7, limit: 13},
    {skip: !isInViewport || !isSystemAvailable, pollingInterval: PollingIntervals.halfMin}
  );

  const executions: ExecutionMetrics[] = useMemo(() => metrics?.executions ?? [], [metrics]);

  const onAbort = useCallback(() => {
    setOpen(false);

    abortAllTestExecutions({id: name})
      .unwrap()
      .then(refetch)
      .catch(() => {
        notificationCall('failed', 'Something went wrong during test execution abortion');
      });
  }, [abortAllTestExecutions, name, refetch]);

  const dropdownItems: ItemType[] = useMemo(
    () => [
      {
        key: `run-test`,
        label: 'Run test',
        onClick: async ({domEvent}) => {
          domEvent.stopPropagation();
          setOpen(false);
          await run();
          refetch();
        },
      },
      {
        key: `edit-test`,
        label: 'Edit test',
        onClick: ({domEvent}) => {
          domEvent.stopPropagation();
          setOpen(false);
          editNavigate();
        },
      },

      ...(executions?.some((e: ExecutionMetrics) => e.status === 'running')
        ? ([
            {key: 'divider', type: 'divider'},
            {
              key: 'abort-executions',
              label: 'Abort all executions',
              onClick: async ({domEvent}) => {
                domEvent.stopPropagation();
                onAbort();
              },
            },
          ] as ItemType[])
        : []),
    ],
    [editNavigate, executions, onAbort, refetch, run]
  );

  return (
    <div ref={ref}>
      <DotsDropdown
        open={open}
        placement="bottomRight"
        disabled={outOfSync}
        items={dropdownItems}
        onOpenChange={setOpen}
      />
    </div>
  );
};

export default TestActionsDropdown;
