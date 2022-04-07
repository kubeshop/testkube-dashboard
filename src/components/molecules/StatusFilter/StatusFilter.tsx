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
  const {filters, setSelectedRecord, setFilters} = props;

  const dispatch = useDispatch();

  const [isVisible, setVisibilityState] = useState(false);

  const onVisibleChange = (flag: boolean) => {
    setVisibilityState(flag);
  };

  const handleClick = useCallback(
    (status: string | undefined) => {
      if (status === filters.status) {
        dispatch(setSelectedRecord({selectedRecord: null}));
        dispatch(setFilters({...filters, page: 0, status: undefined}));
      } else {
        dispatch(setSelectedRecord({selectedRecord: null}));
        dispatch(setFilters({...filters, page: 0, status}));
      }
    },
    [dispatch, setSelectedRecord, setFilters, filters]
  );

  const onMenuClick = () => {};

  const renderedStatuses = useMemo(() => {
    return statusList.map(status => {
      return (
        <StyledFilterMenuItem key={status}>
          <StyledFilterCheckbox checked={filters.status === status} onChange={() => handleClick(status)}>
            {uppercaseFirstSymbol(status)}
          </StyledFilterCheckbox>
        </StyledFilterMenuItem>
      );
    });
  }, [filters.status, handleClick]);

  const menu = (
    <StyledFilterMenu onClick={onMenuClick}>
      {renderedStatuses}
      <FilterMenuFooter onReset={() => handleClick(filters.status)} onOk={() => onVisibleChange(false)} />
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
        <StyledFilterLabel onClick={e => e.preventDefault()}>
          {filters.status ? <AppliedFiltersNotification /> : null}
          Status <FilterFilled />
        </StyledFilterLabel>
      </StyledFilterDropdown>
    </Space>
  );
};

export default StatusFilter;
