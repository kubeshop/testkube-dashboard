import React, {useContext, useEffect} from 'react';

import {DashboardBlueprint} from '@models/dashboard';
import {FilterProps, FilterType} from '@models/filters';
import {SearchParams} from '@models/searchParams';

import {DateFilter, DateRangeFilter, LabelsFilter, StatusFilter, TextFilter, TextSearchFilter} from '@molecules';

import useURLSearchParams from '@hooks/useURLSearchParams';

import {validateSearchParams} from '@utils/fetchUtils';

import {MainContext} from '@contexts';

import {StyledDashboardFiltersContainer, StyledSpace} from './DashboardFilters.styled';

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

const DashboardFilters = (
  props: Pick<DashboardBlueprint, 'filtersComponentsIds' | 'setSelectedRecord' | 'entityType'> & FilterProps
) => {
  const {filtersComponentsIds, ...rest} = props;
  const {setFilters, filters, entityType} = rest;

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
      dispatch(setFilters({...filters, ...validateSearchParams(searchParams, SearchParams[entityType])}));
    }
  }, [entityType]);

  return (
    <StyledDashboardFiltersContainer>
      <StyledSpace data-cy="filters-container">{renderedFilters}</StyledSpace>
    </StyledDashboardFiltersContainer>
  );
};

export default DashboardFilters;
