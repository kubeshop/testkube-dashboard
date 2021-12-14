import {useDispatch} from 'react-redux';

import {Space} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {clearFiltredData, selectFilters} from '@redux/reducers/testsListSlice';

import {Button, LabelInput, Typography} from '@atoms';

import useUpdateURLSearchParams from '@hooks/useUpdateURLSearchParams';

const TestsFilter = () => {
  const filters = useAppSelector(selectFilters);

  useUpdateURLSearchParams(filters);

  const dispatch = useDispatch();

  const handleClick = (status: string | undefined) => {
    dispatch(clearFiltredData({...filters, page: 0, status, date: []}));
  };

  const handleChange = (e: any) => {
    dispatch(clearFiltredData({...filters, page: 0, date: [], scriptName: e.target.value}));
  };

  return (
    <Space>
      <Typography variant="secondary">Show: </Typography>
      <LabelInput placeholder="Script name" value={filters.scriptName} onChange={handleChange} />
      <Button
        active={filters.status === undefined}
        disabled={filters.status === undefined && !filters.date}
        onClick={() => handleClick(undefined)}
        variant="primary"
      >
        All
      </Button>
      <Button
        active={filters.status === 'pending'}
        disabled={filters.status === 'pending'}
        onClick={() => handleClick('pending')}
        variant="primary"
      >
        Running
      </Button>
      <Button
        active={filters.status === 'success'}
        disabled={filters.status === 'success'}
        onClick={() => handleClick('success')}
        variant="primary"
      >
        Passed
      </Button>
      <Button
        active={filters.status === 'error'}
        disabled={filters.status === 'error'}
        onClick={() => handleClick('error')}
        variant="primary"
      >
        Failed
      </Button>
    </Space>
  );
};

export default TestsFilter;
