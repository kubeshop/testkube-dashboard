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

import {useAbortAllTestSuiteExecutionsMutation, useGetTestSuiteExecutionMetricsQuery} from '@services/testSuites';

import {PollingIntervals} from '@utils/numbers';

const TestSuiteActionsDropdown: React.FC<ActionsDropdownProps> = props => {
  const {name, namespace, outOfSync, type} = props;

  const [abortAllTestSuiteExecutions] = useAbortAllTestSuiteExecutionsMutation();

  const isSystemAvailable = useSystemAccess(SystemAccess.system);

  const [open, setOpen] = useState(false);

  const editNavigate = useDashboardNavigate(() => `/test-suites/${name}/settings/tests`);

  const [, run] = useRunEntity('test-suites', {
    name,
    namespace,
    type,
  });

  const ref = useRef(null);
  const isInViewport = useInViewport(ref);

  const {data: metrics, refetch} = useGetTestSuiteExecutionMetricsQuery(
    {id: name, last: 7, limit: 13},
    {
      skip: !isInViewport || !isSystemAvailable,
      pollingInterval: PollingIntervals.halfMin,
      refetchOnMountOrArgChange: true,
    }
  );

  const executions: ExecutionMetrics[] = useMemo(() => metrics?.executions ?? [], [metrics]);

  const onAbort = useCallback(() => {
    setOpen(false);

    abortAllTestSuiteExecutions({id: name})
      .unwrap()
      .then(refetch)
      .catch(() => {
        notificationCall('failed', 'Something went wrong during test suite execution abortion');
      });
  }, [abortAllTestSuiteExecutions, name, refetch]);

  const dropdownItems: ItemType[] = useMemo(
    () => [
      {
        key: `run-test-suite`,
        label: 'Run test suite',
        onClick: async ({domEvent}) => {
          domEvent.stopPropagation();
          setOpen(false);
          await run();
          refetch();
        },
      },
      {
        key: 'edit-test-suite',
        label: 'Edit test suite',
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

export default TestSuiteActionsDropdown;
