import {DashboardBlueprint} from './dashboard';

export type FilterType = 'status' | 'dateRange' | 'date' | 'textSearch' | 'tags' | 'scriptType';

export type FilterProps = {
  setSelectedRecord: any;
  selectedRecord: any;
  setFilters: any;
  filters: any;
  entityType: DashboardBlueprint['entityType'];
  queryParam?: string;
  placeholderText?: string;
};
