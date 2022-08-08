import React, {useContext, useEffect} from 'react';

import {Space} from 'antd';

import {EntityListBlueprint} from '@models/entity';
import {FilterProps, FilterType} from '@models/filters';
import {SearchParams} from '@models/searchParams';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {validateSearchParams} from '@utils/fetchUtils';

import {MainContext} from '@contexts';

import LabelsFilter from './LabelsFilter';
import StatusFilter from './StatusFilter';
import TextSearchFilter from './TextSearchFilter';

const filtersComponents: {[key in FilterType]: React.FC<FilterProps>} = {
  textSearch: TextSearchFilter,
  selector: LabelsFilter,
  status: StatusFilter,
};

const EntityListFilters: React.FC<
  Pick<EntityListBlueprint, 'filtersComponentsIds' | 'entity'> & FilterProps
> = props => {
  const {filtersComponentsIds, ...rest} = props;
  const {setFilters, filters, entity} = rest;

  const {dispatch} = useContext(MainContext);

  const searchParams = useURLSearchParams();

  const renderedFilters = filtersComponentsIds?.map((filterComponentId: FilterType) => {
    const Component = filtersComponents[filterComponentId];

    return <Component {...rest} key={filterComponentId} />;
  });

  useEffect(() => {
    if (Object.entries(searchParams).length) {
      dispatch(setFilters({...filters, ...validateSearchParams(searchParams, SearchParams[entity])}));
    }
  }, [entity]);

  return (
    <Space data-cy="filters-container" size={16}>
      {renderedFilters}
    </Space>
  );
};

export default EntityListFilters;
