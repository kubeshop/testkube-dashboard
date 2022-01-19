import {useDispatch} from 'react-redux';

import {Space} from 'antd';

import {FilterProps} from '@models/filters';

import {Button} from '@atoms';

const statuses = [
  {
    type: 'All',
    value: undefined,
  },
  {
    type: 'Pending',
    value: 'pending',
  },
  {
    type: 'Success',
    value: 'success',
  },
  {
    type: 'Error',
    value: 'error',
  },
];

const StatusFilter: React.FC<FilterProps> = props => {
  const {filters, setSelectedRecord, setFilters} = props;

  const dispatch = useDispatch();

  const handleClick = (status: string | undefined) => {
    dispatch(setSelectedRecord({selectedRecord: null}));
    dispatch(setFilters({...filters, page: 0, status}));
  };

  const renderedStatuses = statuses.map(status => {
    return (
      <Button
        active={filters.status === status.value}
        disabled={filters.status === status.value}
        onClick={() => handleClick(status.value)}
        variant="primary"
      >
        {status.type}
      </Button>
    );
  });

  return <Space>{renderedStatuses}</Space>;
};

export default StatusFilter;
