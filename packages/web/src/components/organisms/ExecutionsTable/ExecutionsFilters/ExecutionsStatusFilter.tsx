import {useCallback, useMemo, useState} from 'react';

import {FilterFilled} from '@ant-design/icons';

import {capitalize} from 'lodash';

import {ExecutionStatusEnum, executionStatusList} from '@models/execution';

import {
  FilterMenuFooter,
  StyledFilterCheckbox,
  StyledFilterDropdown,
  StyledFilterLabel,
  StyledFilterMenu,
  StyledFilterMenuItem,
} from '@molecules/FilterMenu';

import {useEntityDetailsField, useEntityDetailsPick} from '@store/entityDetails';

import Colors from '@styles/Colors';

const ExecutionsStatusFilter: React.FC = () => {
  const [executionsFilters, setExecutionsFilters] = useEntityDetailsField('executionsFilters');
  const {executionsLoading} = useEntityDetailsPick('executionsLoading');

  const [isVisible, setVisibilityState] = useState(false);

  const handleClick = useCallback(
    (status: ExecutionStatusEnum) => {
      if (executionsFilters.status.includes(status)) {
        setExecutionsFilters({
          ...executionsFilters,
          status: executionsFilters.status.filter((currentStatus: string) => {
            return status !== currentStatus;
          }),
        });
      } else {
        setExecutionsFilters({
          ...executionsFilters,
          status: [...executionsFilters.status, status],
        });
      }
    },
    [executionsFilters, setExecutionsFilters]
  );

  const renderedStatuses = useMemo(() => {
    return executionStatusList.map(status => {
      return (
        <StyledFilterMenuItem key={status}>
          <StyledFilterCheckbox
            checked={executionsFilters.status.includes(status)}
            onChange={() => handleClick(status)}
            data-testid={status}
          >
            {capitalize(status)}
          </StyledFilterCheckbox>
        </StyledFilterMenuItem>
      );
    });
  }, [executionsFilters.status, handleClick]);

  const resetFilter = () => {
    setExecutionsFilters({...executionsFilters, status: []});
    setVisibilityState(false);
  };

  const menu = (
    <StyledFilterMenu data-cy="status-filter-dropdown">
      {renderedStatuses}
      <FilterMenuFooter onReset={resetFilter} onOk={() => setVisibilityState(false)} />
    </StyledFilterMenu>
  );

  return (
    <StyledFilterDropdown
      overlay={menu}
      trigger={['click']}
      placement="bottom"
      onOpenChange={(value: boolean) => setVisibilityState(value)}
      open={isVisible}
      disabled={executionsLoading}
    >
      <StyledFilterLabel
        onClick={e => e.preventDefault()}
        data-cy="executions-status-filter-button"
        $disabled={executionsLoading}
      >
        Status <FilterFilled style={{color: executionsFilters.status.length ? Colors.purple : Colors.slate500}} />
      </StyledFilterLabel>
    </StyledFilterDropdown>
  );
};

export default ExecutionsStatusFilter;
