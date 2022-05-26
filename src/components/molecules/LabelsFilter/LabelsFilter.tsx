import {useContext, useEffect, useState} from 'react';

import {Space} from 'antd';

import {FilterFilled} from '@ant-design/icons';

import {Entity, EntityArray} from '@models/entityMap';
import {FilterProps} from '@models/filters';

import {Input} from '@custom-antd';

import {
  AppliedFiltersNotification,
  FilterMenuFooter,
  StyledFilterDropdown,
  StyledFilterLabel,
  StyledFilterMenu,
} from '@molecules/FilterMenu';

import {MainContext} from '@contexts';

import {
  EmptyButton,
  StyledAddRowButton,
  StyledDeleteRowButton,
  StyledKeyValueLabel,
  StyledKeyValueRow,
  StyledLabelsMenuContainer,
  StyledTitle,
} from './LabelsFilter.styled';

const defaultKeyValuePair: Entity = {
  key: '',
  value: '',
};

const LabelsFilter: React.FC<FilterProps> = props => {
  const {setFilters, filters, isFiltersDisabled} = props;

  const {dispatch} = useContext(MainContext);

  const [isVisible, setVisibilityState] = useState(false);
  const [labelsMapping, setLabelsMapping] = useState<EntityArray>([]);

  const onVisibleChange = (flag: boolean) => {
    setVisibilityState(flag);
  };

  const onMenuClick = () => {};

  const onKeyChange = (key: string, index: number) => {
    setLabelsMapping([
      ...labelsMapping.slice(0, index),
      {key, value: labelsMapping[index].value},
      ...labelsMapping.slice(index + 1),
    ]);
  };

  const onValueChange = (value: string, index: number) => {
    setLabelsMapping([
      ...labelsMapping.slice(0, index),
      {key: labelsMapping[index].key, value},
      ...labelsMapping.slice(index + 1),
    ]);
  };

  const onDeleteRow = (index: number) => {
    setLabelsMapping([...labelsMapping.slice(0, index), ...labelsMapping.slice(index + 1)]);
  };

  const onAddRow = () => {
    setLabelsMapping([...labelsMapping, defaultKeyValuePair]);
  };

  useEffect(() => {
    setLabelsMapping([]);
    if (filters.selector.length === 0) {
      setLabelsMapping([defaultKeyValuePair]);
    }
    filters.selector.forEach((item: string) => {
      if (item.includes('=')) {
        const [key, value] = item.split('=');
        setLabelsMapping(currentLabels => [...currentLabels, {key, value}]);
      } else {
        setLabelsMapping(currentLabels => [...currentLabels, {key: item, value: ''}]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.selector]);

  const renderKeyValueInputs = labelsMapping.map((item, index) => (
    <StyledKeyValueRow>
      <Input
        width="220px"
        onChange={event => onKeyChange(event.target.value, index)}
        value={item.key}
        data-cy={`key-input-${index}`}
      />
      <Input
        width="220px"
        onChange={event => onValueChange(event.target.value, index)}
        value={item.value}
        data-cy={`value-input-${index}`}
      />
      {index > 0 ? (
        <StyledDeleteRowButton onClick={() => onDeleteRow(index)} data-cy={`delete-row-${index}`} />
      ) : (
        <EmptyButton />
      )}
    </StyledKeyValueRow>
  ));

  const applyFilters = () => {
    const resultedFilters: string[] = [];
    labelsMapping.forEach(item => {
      if (!item.key) {
        return;
      }
      if (!item.value) {
        resultedFilters.push(item.key);
      } else {
        resultedFilters.push(`${item.key}=${item.value}`);
      }
    });
    dispatch(setFilters({...filters, page: 0, selector: resultedFilters}));
    onVisibleChange(false);
  };

  const resetFilters = () => {
    setLabelsMapping([defaultKeyValuePair]);
    dispatch(setFilters({...filters, page: 0, selector: []}));
  };

  const menu = (
    <StyledFilterMenu onClick={onMenuClick} data-cy="labels-filter-dropdown">
      <StyledLabelsMenuContainer>
        <StyledTitle>Filter tests by Key Value pairs.</StyledTitle>
        <StyledKeyValueRow>
          <StyledKeyValueLabel>Key</StyledKeyValueLabel>
          <StyledKeyValueLabel>Value</StyledKeyValueLabel>
        </StyledKeyValueRow>
        {renderKeyValueInputs}
        <StyledAddRowButton onClick={() => onAddRow()}>&#xFF0B; Add row</StyledAddRowButton>
      </StyledLabelsMenuContainer>
      <FilterMenuFooter onOk={applyFilters} onReset={resetFilters} onCancel={() => onVisibleChange(false)} />
    </StyledFilterMenu>
  );

  const isFilterApplied = filters.selector.length > 0;

  return (
    <Space size={20}>
      <StyledFilterDropdown
        overlay={menu}
        trigger={['click']}
        placement="bottomCenter"
        onVisibleChange={onVisibleChange}
        visible={isVisible}
        disabled={isFiltersDisabled}
      >
        <StyledFilterLabel
          onClick={e => e.preventDefault()}
          data-cy="labels-filter-button"
          isFiltersDisabled={isFiltersDisabled}
        >
          {isFilterApplied ? <AppliedFiltersNotification /> : null}
          Labels <FilterFilled />
        </StyledFilterLabel>
      </StyledFilterDropdown>
    </Space>
  );
};

export default LabelsFilter;
