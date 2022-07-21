import {Entity} from './entity';

export type FilterType = 'status' | 'dateRange' | 'date' | 'textSearch' | 'selector' | 'testType' | 'search';

export type FilterProps = {
  setFilters: any;
  filters: any;
  queryParam?: string;
  placeholderText?: string;
  isFiltersDisabled: boolean;
  entity: Entity;
};
