/* eslint-disable unused-imports/no-unused-imports-ts */
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

const datePickerStyles = {
  color: 'var(--color-dark-quaternary)',
  backgroundColor: 'var(--color-dark-primary)',
  border: '1px solid var(--color-dark-quaternary)',
  width: '250px',
  height: '36px',
};

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
    if (Object.entries(searchParams).length) {
      dispatch(setFilters({...filters, ...validateSearchParams(searchParams, SearchParams.scripts)}));
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
      <Typography variant="secondary">Show: </Typography>
      <LabelInput placeholder="Script name" value={scriptName} onChange={handleChange} />
    </Space>
  );
};

export default ScriptsFilters;
