import {useCallback, useMemo} from 'react';

import {ItemType} from 'antd/lib/menu/hooks/useItems';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import useRunEntity from '@hooks/useRunEntity';

import {DotsDropdown, notificationCall} from '@molecules';

import {useAbortAllTestSuiteExecutionsMutation} from '@services/testSuites';
import {useAbortAllTestExecutionsMutation} from '@services/tests';

type EntityDropdownProps = {
  entityLabel: string;
  name: string;
  namespace?: string;
  outOfSync?: boolean;
  type?: string;
};

const EntityDropdown: React.FC<EntityDropdownProps> = props => {
  const {entityLabel, name, namespace, outOfSync, type} = props;

  const [abortAllTestExecutions] = useAbortAllTestExecutionsMutation();
  const [abortAllTestSuiteExecutions] = useAbortAllTestSuiteExecutionsMutation();

  const editNavigate = useDashboardNavigate(
    () =>
      `/${entityLabel === 'test' ? 'tests' : 'test-suites'}/${name}/settings/${
        entityLabel === 'test' ? 'test' : 'tests'
      }`
  );

  const [isRunning, run] = useRunEntity(entityLabel === 'test' ? 'tests' : 'test-suites', {
    name,
    namespace,
    type,
  });

  const onAbort = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();

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
      editNavigate();
    },
    [editNavigate]
  );

  const onRun = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
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

      ...(isRunning
        ? [
            {key: 'divider', type: 'divider'},
            {key: 'abort-executions', label: <span onClick={onAbort}>Abort all executions</span>},
          ]
        : []),
    ],
    [entityLabel, isRunning, onAbort, onEdit, onRun]
  );

  return <DotsDropdown placement="bottomRight" disabled={outOfSync} items={dropdownItems} />;
};

export default EntityDropdown;
