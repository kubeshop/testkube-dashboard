import {useCallback, useContext, useMemo, useState} from 'react';

import {FilterFilled} from '@ant-design/icons';

import {capitalize} from 'lodash';

import {MainContext} from '@contexts';

import {FilterProps} from '@models/filters';

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

const StatusFilter: React.FC<FilterProps> = props => {
  const {filters, setFilters, isFiltersDisabled, width} = props;

  const {dispatch} = useContext(MainContext);

  const [isVisible, setVisibilityState] = useState(false);

  const onOpenChange = (flag: boolean) => {
    setVisibilityState(flag);
  };

  const handleClick = useCallback(
    (status: string) => {
      if (filters.status.includes(status)) {
        dispatch(
          setFilters({
            ...filters,
            status: filters.status.filter((currentStatus: string) => {
              return status !== currentStatus;
            }),
          })
        );
      } else {
        dispatch(setFilters({...filters, status: [...filters.status, status], pageSize: initialPageSize}));
      }
    },
    [dispatch, setFilters, filters]
  );

  const renderedStatuses = useMemo(() => {
    return statusList.map(status => {
      return (
        <StyledFilterMenuItem key={status}>
          <StyledFilterCheckbox
            checked={filters.status.includes(status)}
            onChange={() => handleClick(status)}
            data-cy={status}
          >
            {capitalize(status)}
          </StyledFilterCheckbox>
        </StyledFilterMenuItem>
      );
    });
  }, [filters.status, handleClick]);

  const resetFilter = () => {
    dispatch(setFilters({...filters, status: [], pageSize: initialPageSize}));
    onOpenChange(false);
  };

  const menu = (
    <StyledFilterMenu data-cy="status-filter-dropdown">
      {renderedStatuses}
      <FilterMenuFooter onReset={resetFilter} onOk={() => onOpenChange(false)} />
    </StyledFilterMenu>
  );

  const isFilterApplied = filters.status.length > 0;

  return (
    <StyledFilterDropdown
      overlay={menu}
      trigger={['click']}
      placement="bottom"
      onOpenChange={onOpenChange}
      open={isVisible}
      disabled={isFiltersDisabled}
    >
      <StyledFilterLabel
        onClick={e => e.preventDefault()}
        data-cy="status-filter-button"
        isFiltersDisabled={isFiltersDisabled}
      >
        Status <FilterFilled style={{color: isFilterApplied ? Colors.purple : Colors.slate500}} />
      </StyledFilterLabel>
    </StyledFilterDropdown>
  );
};

export default StatusFilter;
