/* eslint-disable unused-imports/no-unused-imports-ts */
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useDebounce} from 'react-use';

import {DatePicker, Space} from 'antd';

import moment from 'moment';

import {SearchParams} from '@models/searchParams';

import {useAppSelector} from '@redux/hooks';
import {clearFiltredData, selectFilters, setFilters} from '@redux/reducers/executionsSlice';

import {Button, LabelInput, Typography} from '@atoms';

import useURLSearchParams from '@hooks/useURLSearchParams';
import useUpdateURLSearchParams from '@hooks/useUpdateURLSearchParams';

import {validateSearchParams} from '@utils/fetchUtils';

const {RangePicker} = DatePicker;

const datePickerStyles = {
  color: 'var(--color-dark-quaternary)',
  backgroundColor: 'var(--color-dark-primary)',
  border: '1px solid var(--color-dark-quaternary)',
  width: '250px',
  height: '36px',
};

const ExecutionsFilters = (props: any) => {
  const {setSelectedRecord, selectedRecord} = props;

  const dispatch = useDispatch();

  const filters = useAppSelector(selectFilters);

  const searchParams = useURLSearchParams();

  const [scriptName, setScriptName] = useState(filters.scriptName);

  const handleDateRange = (_: any, dateString: any) => {
    if (!dateString) {
      dispatch(clearFiltredData({...filters, startDate: null, endDate: null}));
    } else {
      dispatch(clearFiltredData({...filters, page: 0, startDate: dateString[0], endDate: dateString[1]}));
    }
  };

  const handleClick = (status: string | undefined) => {
    dispatch(setSelectedRecord({selectedRecord: null}));
    dispatch(clearFiltredData({...filters, page: 0, status}));
  };

  const handleChange = (e: any) => {
    dispatch(setSelectedRecord({selectedRecord: null}));

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

  useEffect(() => {
    if (Object.entries(searchParams).length) {
      dispatch(setFilters({...filters, ...validateSearchParams(searchParams, SearchParams.executions)}));
    }

    return () => {
      dispatch(
        setFilters({
          ...filters,
          page: 0,
        })
      );
    };
  }, []);

  return (
    <Space>
      <RangePicker
        placeholder={['Select time', 'Select time']}
        style={datePickerStyles}
        onChange={handleDateRange}
        format="YYYY-MM-DD"
        value={[filters?.startDate && moment(filters?.startDate), filters?.endDate && moment(filters?.endDate)]}
      />
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

export default ExecutionsFilters;
