import {FC, memo, useContext, useEffect} from 'react';

import {Space} from 'antd';

import {MainContext} from '@contexts';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {Entity} from '@models/entity';
import {FilterProps} from '@models/filters';

import {validateSearchParams} from '@utils/fetchUtils';

import LabelsFilter from './LabelsFilter';
import StatusFilter from './StatusFilter';
import TextSearchFilter from './TextSearchFilter';

const EntityListFilters: FC<{entity: Entity} & FilterProps> = props => {
  const {isFiltersDisabled, ...rest} = props;
  const {setFilters, filters, entity} = rest;

  const {dispatch} = useContext(MainContext);

  const searchParams = useURLSearchParams();

  useEffect(() => {
    if (Object.entries(searchParams).length) {
      dispatch(setFilters({...filters, ...validateSearchParams(searchParams)}));
    }
  }, [entity]);

  return (
    <Space data-cy="filters-container" size={16} wrap>
      <TextSearchFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
      <LabelsFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
      <StatusFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
    </Space>
  );
};

export default memo(EntityListFilters);
