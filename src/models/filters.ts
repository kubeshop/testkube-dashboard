export type FilterType = 'textSearch' | 'selector' | 'status';

export type FilterProps = {
  setFilters: any;
  filters: any;
  queryParam?: string;
  placeholderText?: string;
  isFiltersDisabled: boolean;
};
