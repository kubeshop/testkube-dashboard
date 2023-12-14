import {useCallback, useMemo, useState} from 'react';

import {ItemType} from 'antd/lib/menu/hooks/useItems';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import useRunEntity from '@hooks/useRunEntity';

import {ExecutionMetrics} from '@models/metrics';

import {DotsDropdown, notificationCall} from '@molecules';

import {useAbortAllTestSuiteExecutionsMutation} from '@services/testSuites';
import {useAbortAllTestExecutionsMutation} from '@services/tests';

type EntityDropdownProps = {
  entityLabel: string;
  name: string;
  executions?: ExecutionMetrics[];
  namespace?: string;
  outOfSync?: boolean;
  type?: string;
};

const EntityDropdown: React.FC<EntityDropdownProps> = props => {
  const {entityLabel, executions, name, namespace, outOfSync, type} = props;

  const [abortAllTestExecutions] = useAbortAllTestExecutionsMutation();
  const [abortAllTestSuiteExecutions] = useAbortAllTestSuiteExecutionsMutation();

  const [open, setOpen] = useState(false);

  const editNavigate = useDashboardNavigate(() =>
    entityLabel === 'test' ? `/tests/${name}/settings/test` : `/test-suites/${name}/settings/tests`
  );

  const [, run] = useRunEntity(entityLabel === 'test' ? 'tests' : 'test-suites', {
    name,
    namespace,
    type,
  });

  const onAbort = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      setOpen(false);

      if (entityLabel === 'test') {
        abortAllTestExecutions({id: name})
          .unwrap()
          .catch(() => {
            notificationCall('failed', 'Something went wrong during test execution abortion');
          });
      } else if (entityLabel === 'test suite') {
        abortAllTestSuiteExecutions({id: name})
          .unwrap()
          .catch(() => {
            notificationCall('failed', 'Something went wrong during test suite execution abortion');
          });
      }
    },
    [abortAllTestExecutions, abortAllTestSuiteExecutions, entityLabel, name]
  );

  const onEdit = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      setOpen(false);
      editNavigate();
    },
    [editNavigate]
  );

  const onRun = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      setOpen(false);
      run();
    },
    [run]
  );

  const dropdownItems: ItemType[] = useMemo(
    () => [
      {
        key: `run-${entityLabel}`,
        label: <span onClick={onRun}>Run {entityLabel}</span>,
      },
      {
        key: `edit-${entityLabel}`,
        label: <span onClick={onEdit}>Edit {entityLabel}</span>,
      },

      ...(executions?.some(e => e.status === 'running')
        ? [
            {key: 'divider', type: 'divider'},
            {key: 'abort-executions', label: <span onClick={onAbort}>Abort all executions</span>},
          ]
        : []),
    ],
    [entityLabel, executions, onAbort, onEdit, onRun]
  );

  return (
    <DotsDropdown
      open={open}
      placement="bottomRight"
      disabled={outOfSync}
      items={dropdownItems}
      onOpenChange={setOpen}
    />
  );
};

export default EntityDropdown;
