import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useDebounce} from 'react-use';

import {Space} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {clearFiltredData, selectFilters} from '@redux/reducers/executionsSlice';

import {Button, LabelInput, Typography} from '@atoms';

import useUpdateURLSearchParams from '@hooks/useUpdateURLSearchParams';

const TestsFilter = () => {
  const filters = useAppSelector(selectFilters);

  useUpdateURLSearchParams(filters);

  const [scriptName, setScriptName] = useState(filters.scriptName);

  const dispatch = useDispatch();

  const handleClick = (status: string | undefined) => {
    dispatch(clearFiltredData({...filters, page: 0, status, date: []}));
  };

  const handleChange = (e: any) => {
    setScriptName(e.target.value);
  };

  useDebounce(
    () => {
      dispatch(clearFiltredData({...filters, page: 0, date: [], scriptName}));
    },
    300,
    [scriptName]
  );

  useEffect(() => {
    setScriptName(filters.scriptName);
  }, [filters]);

  return (
    <Space>
      <Typography variant="secondary">Show: </Typography>
      <LabelInput placeholder="Script name" value={scriptName} onChange={handleChange} />
      <Button active={filters.status === undefined} onClick={() => handleClick(undefined)} variant="primary">
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
