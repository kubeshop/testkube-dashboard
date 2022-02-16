import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {DashboardBlueprint} from '@models/dashboard';
import {FilterProps, FilterType} from '@models/filters';
import {SearchParams} from '@models/searchParams';

import {DateFilter, DateRangeFilter, StatusFilter, TagsFilter, TextFilter} from '@molecules';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {validateSearchParams} from '@utils/fetchUtils';

import {StyledDashboardFiltersContainer, StyledSpace} from './DashboardFilters.styled';

const filtersComponents: {[key in FilterType]: React.FC<FilterProps>} = {
  status: StatusFilter,
  dateRange: DateRangeFilter,
  date: DateFilter,
  textSearch: TextFilter,
  tags: TagsFilter,
  scriptType: TextFilter,
};

const filterSpecificProps: Partial<Record<FilterType, any>> = {
  scriptType: {
    queryParam: 'type',
    placeholderText: 'Test type',
  },
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

    const componentProps = {
      ...filterSpecificProps[filterComponentId],
      ...rest,
    };

    return <Component {...componentProps} />;
  });

  useEffect(() => {
    if (Object.entries(searchParams).length) {
      dispatch(setFilters({...filters, ...validateSearchParams(searchParams, SearchParams[entityType])}));
    }
  }, [entityType]);

  return (
    <StyledDashboardFiltersContainer>
      <StyledSpace size={20}>{renderedFilters}</StyledSpace>
    </StyledDashboardFiltersContainer>
  );
};

export default DashboardFilters;
