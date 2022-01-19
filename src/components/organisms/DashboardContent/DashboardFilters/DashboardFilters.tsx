import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {Space} from 'antd';

import {DashboardBlueprint} from '@models/dashboard';
import {FilterProps, FilterType} from '@models/filters';
import {SearchParams} from '@models/searchParams';

import {DateFilter, DateRangeFilter, StatusFilter, TagsFilter, TextFilter} from '@molecules';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {validateSearchParams} from '@utils/fetchUtils';

import {StyledDashboardFiltersContainer} from './DashboardFilters.styled';

const filtersComponents: {[key in FilterType]: React.FC<any>} = {
  status: StatusFilter,
  dateRange: DateRangeFilter,
  date: DateFilter,
  textSearch: TextFilter,
  tags: TagsFilter,
};

const DashboardFilters = (
  props: Pick<DashboardBlueprint, 'filtersComponentsIds' | 'setSelectedRecord' | 'entityType'> & FilterProps
) => {
  const {filtersComponentsIds, ...rest} = props;
  const {setFilters, filters, entityType} = rest;

  const searchParams = useURLSearchParams();

  const dispatch = useDispatch();

  const renderedFilters = filtersComponentsIds?.map((filterComponentId: FilterType) => {
    const Component = filtersComponents[filterComponentId];

    return <Component {...rest} />;
  });

  useEffect(() => {
    if (Object.entries(searchParams).length) {
      dispatch(setFilters({...filters, ...validateSearchParams(searchParams, SearchParams[entityType])}));
    }
  }, [entityType]);

  return (
    <StyledDashboardFiltersContainer>
      <Space size={20}>{renderedFilters}</Space>;
    </StyledDashboardFiltersContainer>
  );
};

export default DashboardFilters;
