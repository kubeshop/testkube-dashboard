import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useDebounce} from 'react-use';

import {Space} from 'antd';

import {SearchParams} from '@models/searchParams';

import {useAppSelector} from '@redux/hooks';
import {selectFilters, setFilters} from '@redux/reducers/testsSlice';

import {LabelInput, Typography} from '@atoms';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {validateSearchParams} from '@utils/fetchUtils';

const TestsFilters = (props: any) => {
  const {setSelectedRecord, selectedRecord} = props;

  const dispatch = useDispatch();

  const filters = useAppSelector(selectFilters);

  const searchParams = useURLSearchParams();

  const [testName, setTestName] = useState(filters.textSearch);

  const handleChange = (e: any) => {
    dispatch(setSelectedRecord({selectedRecord: null}));

    setTestName(e.target.value);
  };

  useDebounce(
    () => {
      dispatch(setFilters({...filters, page: 0, textSearch: testName}));
    },
    300,
    [testName]
  );

  useEffect(() => {
    if (Object.entries(searchParams).length) {
      dispatch(setFilters({...filters, ...validateSearchParams(searchParams, SearchParams.tests)}));
    }
  }, []);

  return (
    <Space>
      <Typography variant="secondary">Show: </Typography>
      <LabelInput placeholder="Test name" value={testName} onChange={handleChange} />
    </Space>
  );
};

export default TestsFilters;
