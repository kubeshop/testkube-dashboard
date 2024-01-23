import {useEffect, useState} from 'react';
import {useDebounce} from 'react-use';

import {SearchOutlined} from '@ant-design/icons';

import {useEntityDetailsField} from '@store/entityDetails';

import Colors from '@styles/Colors';

import * as S from './ExecutionsFilters.styled';
import ExecutionsStatusFilter from './ExecutionsStatusFilter';

const ExecutionsFilters: React.FC = () => {
  const [executionsFilters, setExecutionsFilters] = useEntityDetailsField('executionsFilters');

  const [searchInputValue, setSearchInputValue] = useState(executionsFilters.textSearch);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const [, cancel] = useDebounce(
    () => {
      setExecutionsFilters({...executionsFilters, textSearch: searchInputValue});
    },
    300,
    [searchInputValue]
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return (
    <S.FiltersContainer>
      <S.SearchInput
        prefix={<SearchOutlined style={{color: Colors.slate500}} />}
        placeholder="Search execution"
        data-cy="executions-search-filter"
        value={searchInputValue}
        onChange={onChange}
      />
      <ExecutionsStatusFilter />
    </S.FiltersContainer>
  );
};

export default ExecutionsFilters;
