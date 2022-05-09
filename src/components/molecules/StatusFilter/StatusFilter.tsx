import {useCallback, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Space} from 'antd';

import {FilterFilled} from '@ant-design/icons';

import {FilterProps} from '@models/filters';

import {
  AppliedFiltersNotification,
  FilterMenuFooter,
  StyledFilterCheckbox,
  StyledFilterDropdown,
  StyledFilterLabel,
  StyledFilterMenu,
  StyledFilterMenuItem,
} from '@molecules/FilterMenu';

import {uppercaseFirstSymbol} from '@src/utils/strings';

const statusList = ['queued', 'running', 'passed', 'failed'];

const StatusFilter: React.FC<FilterProps> = props => {
  const {filters, setFilters} = props;

  const dispatch = useDispatch();

  const [isVisible, setVisibilityState] = useState(false);

  const onVisibleChange = (flag: boolean) => {
    setVisibilityState(flag);
  };

  const handleClick = useCallback(
    (status: string) => {
      if (filters.status.includes(status)) {
        dispatch(
          setFilters({
            ...filters,
            page: 0,
            status: filters.status.filter((currentStatus: string) => {
              return status !== currentStatus;
            }),
          })
        );
      } else {
        dispatch(setFilters({...filters, status: [...filters.status, status]}));
      }
    },
    [dispatch, setFilters, filters]
  );

  const onMenuClick = () => {};

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

  const menu = (
    <StyledFilterMenu onClick={onMenuClick} data-cy="status-filter-dropdown">
      {renderedStatuses}
      <FilterMenuFooter
        onReset={() => dispatch(setFilters({...filters, status: []}))}
        onOk={() => onVisibleChange(false)}
      />
    </StyledFilterMenu>
  );

  return (
    <Space>
      <StyledFilterDropdown
        overlay={menu}
        trigger={['click']}
        placement="bottomCenter"
        onVisibleChange={onVisibleChange}
        visible={isVisible}
      >
        <StyledFilterLabel onClick={e => e.preventDefault()} data-cy="status-filter-button">
          {filters.status.length > 0 ? <AppliedFiltersNotification /> : null}
          Status <FilterFilled />
        </StyledFilterLabel>
      </StyledFilterDropdown>
    </Space>
  );
};

export default StatusFilter;
