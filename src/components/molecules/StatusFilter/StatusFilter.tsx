import {useCallback, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Checkbox, Dropdown, Menu, Space} from 'antd';

import {FilterFilled} from '@ant-design/icons';

import {FilterProps} from '@models/filters';

import {StyledFilterLabel} from './StatusFilter.styled';

const statusList = ['All', 'Pending', 'Success', 'Error'];

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

  const renderedStatus = useMemo(() => {
    return statusList.map(status => {
      return (
        <Menu.Item key={status}>
          <Checkbox checked={filters.status === status} onChange={() => handleClick(status)}>
            {status}
          </Checkbox>
        </Menu.Item>
      );
    });
  }, [filters.status, handleClick]);

  const menu = <Menu onClick={onMenuClick}>{renderedStatus}</Menu>;

  return (
    <Space>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement="bottomCenter"
        onVisibleChange={onVisibleChange}
        visible={isVisible}
      >
        <StyledFilterLabel onClick={e => e.preventDefault()}>
          Status <FilterFilled />
        </StyledFilterLabel>
      </Dropdown>
    </Space>
  );
};

export default StatusFilter;
