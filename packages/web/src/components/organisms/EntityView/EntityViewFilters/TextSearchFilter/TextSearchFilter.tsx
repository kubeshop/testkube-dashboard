import {useEffect, useState} from 'react';
import {useDebounce} from 'react-use';

import {SearchOutlined} from '@ant-design/icons';
import {Input} from 'antd';

import {EntityFilters} from '@models/entity';

import {initialPageSize} from '@redux/initialState';

import Colors from '@styles/Colors';

const TextSearchFilter: React.FC<EntityFilters> = props => {
  const {filters, setFilters, disabled} = props;

  const [inputValue, setInputValue] = useState(filters.textSearch);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [, cancel] = useDebounce(
    () => {
      setFilters({...filters, textSearch: inputValue, pageSize: initialPageSize});
    },
    300,
    [inputValue]
  );

  useEffect(cancel, []);

  useEffect(() => {
    setInputValue(filters.textSearch);
  }, [filters]);

  return (
    <Input
      prefix={<SearchOutlined style={{color: Colors.slate500}} />}
      placeholder="Search"
      onChange={onChange}
      value={inputValue}
      data-cy="search-filter"
      disabled={disabled}
    />
  );
};

export default TextSearchFilter;
