import {useCallback, useContext, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useDebounce} from 'react-use';

import {FilterFilled} from '@ant-design/icons';

import {FilterProps} from '@models/filters';

import {initialPageSize} from '@redux/initialState';

import {
  FilterMenuFooter,
  StyledFilterCheckbox,
  StyledFilterDropdown,
  StyledFilterLabel,
  StyledFilterMenu,
  StyledFilterMenuItem,
} from '@molecules/FilterMenu';

import {uppercaseFirstSymbol} from '@utils/strings';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

const statusList = ['queued', 'running', 'passed', 'failed', 'aborted'];

const StatusFilter: React.FC<FilterProps> = props => {
  const {filters, setFilters, isFiltersDisabled} = props;

  const {dispatch} = useContext(MainContext);
  const [searchParams, setSearchParams] = useSearchParams();

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

  useDebounce(
    () => {
      if (filters.status.length > 0) {
        searchParams.set('status', filters.status);
        setSearchParams(searchParams);
      } else {
        searchParams.delete('status');
        setSearchParams(searchParams);
      }
    },
    300,
    [filters.status]
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
            {uppercaseFirstSymbol(status)}
          </StyledFilterCheckbox>
        </StyledFilterMenuItem>
      );
    });
  }, [filters.status, handleClick]);

  const resetFilter = () => {
    dispatch(setFilters({...filters, status: [], pageSize: initialPageSize}));
    onOpenChange(false);

    searchParams.delete('status');
    setSearchParams(searchParams);
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
