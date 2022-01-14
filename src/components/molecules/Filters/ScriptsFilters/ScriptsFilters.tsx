import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useDebounce} from 'react-use';

import {Space} from 'antd';

import {SearchParams} from '@models/searchParams';

import {useAppSelector} from '@redux/hooks';
import {selectFilters, setFilters} from '@redux/reducers/scriptsSlice';

import {LabelInput, Typography} from '@atoms';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {validateSearchParams} from '@utils/fetchUtils';

const ScriptsFilters = (props: any) => {
  const {setSelectedRecord, selectedRecord} = props;

  const dispatch = useDispatch();

  const filters = useAppSelector(selectFilters);

  const searchParams = useURLSearchParams();

  const [scriptName, setScriptName] = useState(filters.textSearch);

  const handleChange = (e: any) => {
    dispatch(setSelectedRecord({selectedRecord: null}));

    setScriptName(e.target.value);
  };

  useDebounce(
    () => {
      dispatch(setFilters({...filters, page: 0, textSearch: scriptName}));
    },
    300,
    [scriptName]
  );

  useEffect(() => {
    setScriptName(filters.textSearch);
  }, [filters]);

  useEffect(() => {
    if (Object.entries(searchParams).length) {
      dispatch(setFilters({...filters, ...validateSearchParams(searchParams, SearchParams.scripts)}));
    }
  }, []);

  return (
    <Space>
      <Typography variant="secondary">Show: </Typography>
      <LabelInput placeholder="Script name" value={scriptName} onChange={handleChange} />
    </Space>
  );
};

export default ScriptsFilters;
