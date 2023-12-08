import {useCallback, useMemo} from 'react';

import {ItemType} from 'antd/lib/menu/hooks/useItems';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';
import useRunEntity from '@hooks/useRunEntity';

import {DotsDropdown} from '@molecules';

import {Item} from './EntityGridItemPure';

type EntityGridItemDropdownProps = {
  entityLabel: string;
  item: Item;
  outOfSync?: boolean;
  onAbort: (item: Item) => void;
};

const EntityGridItemDropdown: React.FC<EntityGridItemDropdownProps> = props => {
  const {entityLabel, item, outOfSync, onAbort} = props;

  const editNavigate = useDashboardNavigate(
    () =>
      `/${entityLabel === 'test' ? 'tests' : 'test-suites'}/${item.name}/settings/${
        entityLabel === 'test' ? 'test' : 'tests'
      }`
  );

  const [isRunning, run] = useRunEntity(entityLabel === 'test' ? 'tests' : 'test-suites', {
    name: item.name,
    namespace: item.namespace,
    type: item.type,
  });

  const abort = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      event.stopPropagation();
      onAbort(item);
    },
    [onAbort, item]
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
            {key: 'abort-executions', label: <span onClick={abort}>Abort all executions</span>},
          ]
        : []),
    ],
    [abort, entityLabel, isRunning, onEdit, onRun]
  );

  return <DotsDropdown placement="bottomRight" disabled={outOfSync} items={dropdownItems} />;
};

export default EntityGridItemDropdown;
