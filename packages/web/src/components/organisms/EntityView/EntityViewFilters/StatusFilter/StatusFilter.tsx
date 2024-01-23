import {useCallback, useMemo, useState} from 'react';

import {FilterFilled} from '@ant-design/icons';

import {capitalize} from 'lodash';

import {EntityFilters} from '@models/entity';

import {
  FilterMenuFooter,
  StyledFilterCheckbox,
  StyledFilterDropdown,
  StyledFilterLabel,
  StyledFilterMenu,
  StyledFilterMenuItem,
} from '@molecules/FilterMenu';

import {initialPageSize} from '@redux/initialState';

import Colors from '@styles/Colors';

const statusList = ['queued', 'running', 'passed', 'failed', 'aborted'];

const StatusFilter: React.FC<EntityFilters> = props => {
  const {filters, setFilters, disabled} = props;

  const [isVisible, setVisibilityState] = useState(false);

  const onOpenChange = (flag: boolean) => {
    setVisibilityState(flag);
  };

  const handleClick = useCallback(
    (status: string) => {
      if (filters.status.includes(status)) {
        setFilters({
          ...filters,
          status: filters.status.filter((currentStatus: string) => {
            return status !== currentStatus;
          }),
        });
      } else {
        setFilters({...filters, status: [...filters.status, status], pageSize: initialPageSize});
      }
    },
    [setFilters, filters]
  );

  const renderedStatuses = useMemo(() => {
    return statusList.map(status => {
      return (
        <StyledFilterMenuItem key={status}>
          <StyledFilterCheckbox
            checked={filters.status.includes(status)}
            onChange={() => handleClick(status)}
            data-testid={status}
          >
            {capitalize(status)}
          </StyledFilterCheckbox>
        </StyledFilterMenuItem>
      );
    });
  }, [filters.status, handleClick]);

  const resetFilter = () => {
    setFilters({...filters, status: [], pageSize: initialPageSize});
    onOpenChange(false);
  };

  const menu = (
    <StyledFilterMenu data-cy="status-filter-dropdown">
      {renderedStatuses}
      <FilterMenuFooter onReset={resetFilter} onOk={() => onOpenChange(false)} />
    </StyledFilterMenu>
  );

  return (
    <StyledFilterDropdown
      overlay={menu}
      trigger={['click']}
      placement="bottom"
      onOpenChange={onOpenChange}
      open={isVisible}
      disabled={disabled}
    >
      <StyledFilterLabel onClick={e => e.preventDefault()} data-cy="status-filter-button" $disabled={disabled}>
        Status <FilterFilled style={{color: filters.status.length > 0 ? Colors.purple : Colors.slate500}} />
      </StyledFilterLabel>
    </StyledFilterDropdown>
  );
};

export default StatusFilter;
