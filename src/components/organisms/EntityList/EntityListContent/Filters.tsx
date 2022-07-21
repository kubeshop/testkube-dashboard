import React, {useContext, useEffect} from 'react';

import {Space} from 'antd';

import {EntityListBlueprint} from '@models/entity';
import {FilterProps, FilterType} from '@models/filters';
import {SearchParams} from '@models/searchParams';

import {DateFilter, DateRangeFilter, LabelsFilter, StatusFilter, TextFilter, TextSearchFilter} from '@molecules';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {validateSearchParams} from '@utils/fetchUtils';

import {MainContext} from '@contexts';

const filtersComponents: {[key in FilterType]: React.FC<FilterProps>} = {
  status: StatusFilter,
  dateRange: DateRangeFilter,
  date: DateFilter,
  textSearch: TextSearchFilter,
  selector: LabelsFilter,
  testType: TextFilter,
  search: TextSearchFilter,
};

const filterSpecificProps: Partial<Record<FilterType, any>> = {
  testType: {
    queryParam: 'type',
    placeholderText: 'Test type',
  },
};

const Filters: React.FC<Pick<EntityListBlueprint, 'filtersComponentsIds' | 'entity'> & FilterProps> = props => {
  const {filtersComponentsIds, ...rest} = props;
  const {setFilters, filters, entity} = rest;

  const {dispatch} = useContext(MainContext);

  const searchParams = useURLSearchParams();

  const renderedFilters = filtersComponentsIds?.map((filterComponentId: FilterType) => {
    const Component = filtersComponents[filterComponentId];

    const componentProps = {
      ...filterSpecificProps[filterComponentId],
      ...rest,
    };

    return <Component {...componentProps} key={filterComponentId} />;
  });

  useEffect(() => {
    if (Object.entries(searchParams).length) {
      dispatch(setFilters({...filters, ...validateSearchParams(searchParams, SearchParams[entity])}));
    }
  }, [entity]);

  return (
    <div>
      <Space data-cy="filters-container">{renderedFilters}</Space>
    </div>
  );
};

export default Filters;
