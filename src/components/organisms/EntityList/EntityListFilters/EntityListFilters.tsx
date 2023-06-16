import {FC, memo} from 'react';

import {Space} from 'antd';

import {FilterProps} from '@models/filters';

import LabelsFilter from './LabelsFilter';
import StatusFilter from './StatusFilter';
import TextSearchFilter from './TextSearchFilter';

const EntityListFilters: FC<FilterProps> = props => {
  const {isFiltersDisabled, ...rest} = props;

  return (
    <Space data-cy="filters-container" size={16} wrap>
      <TextSearchFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
      <LabelsFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
      <StatusFilter {...rest} isFiltersDisabled={isFiltersDisabled} />
    </Space>
  );
};

export default memo(EntityListFilters);
