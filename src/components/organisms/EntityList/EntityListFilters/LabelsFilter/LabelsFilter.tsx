import {useEffect, useState} from 'react';

import {FilterFilled} from '@ant-design/icons';

import {Button, Input, Title} from '@custom-antd';

import usePressEnter from '@hooks/usePressEnter';

import {Entity} from '@models/entityMap';
import {FilterProps} from '@models/filters';

import {FilterMenuFooter, StyledFilterDropdown, StyledFilterLabel, StyledFilterMenu} from '@molecules/FilterMenu';

import {initialPageSize} from '@redux/initialState';

import Colors from '@styles/Colors';

import {decodeSelectorArray, encodeSelectorArray} from '@utils/selectors';

import {EmptyButton, StyledKeyValueRow, StyledLabelsMenuContainer} from './LabelsFilter.styled';

const defaultKeyValuePair: Entity = {
  key: '',
  value: '',
};

const LabelsFilter: React.FC<FilterProps> = props => {
  const {setFilters, filters, isFiltersDisabled, width} = props;

  const [isVisible, setVisibilityState] = useState(false);
  const [labelsMapping, setLabelsMapping] = useState<Entity[]>([]);

  const onEvent = usePressEnter();

  const onOpenChange = (flag: boolean) => {
    setVisibilityState(flag);
  };

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
    const mapping = decodeSelectorArray(filters.selector);
    setLabelsMapping(mapping.length === 0 ? [defaultKeyValuePair] : mapping);
  }, [filters.selector]);

  const renderKeyValueInputs = labelsMapping.map((item, index) => {
    const key = `key-value-pair${index}`;

    return (
      <StyledKeyValueRow key={key}>
        <Input
          width="220px"
          onChange={event => onKeyChange(event.target.value, index)}
          value={item.key}
          data-cy={`key-input-${index}`}
          placeholder="Key"
        />
        <Input
          width="220px"
          onChange={event => onValueChange(event.target.value, index)}
          value={item.value}
          data-cy={`value-input-${index}`}
          placeholder="Value"
        />
        {index > 0 ? (
          <Button $customType="tertiary" onClick={() => onDeleteRow(index)} data-cy={`delete-row-${index}`}>
            &#10005;
          </Button>
        ) : (
          <EmptyButton />
        )}
      </StyledKeyValueRow>
    );
  });

  const applyFilters = () => {
    const selector = encodeSelectorArray(labelsMapping);
    setFilters({...filters, selector, pageSize: initialPageSize});
    onOpenChange(false);
  };

  const resetFilters = () => {
    setLabelsMapping([defaultKeyValuePair]);
    onOpenChange(false);
    setFilters({...filters, selector: '', pageSize: initialPageSize});
  };

  const menu = (
    <StyledFilterMenu
      data-cy="labels-filter-dropdown"
      onKeyPress={event => {
        onEvent(event, applyFilters);
      }}
    >
      <StyledLabelsMenuContainer>
        <Title level={5}>Filter tests by Key Value pairs.</Title>
        {renderKeyValueInputs}
        <Button $customType="secondary" onClick={onAddRow}>
          Add another row
        </Button>
      </StyledLabelsMenuContainer>
      <FilterMenuFooter onOk={applyFilters} onReset={resetFilters} />
    </StyledFilterMenu>
  );

  const isFilterApplied = filters.selector.length > 0;

  return (
    <StyledFilterDropdown
      overlay={menu}
      trigger={['click']}
      placement="bottom"
      onOpenChange={onOpenChange}
      open={isVisible}
      disabled={isFiltersDisabled}
    >
      <StyledFilterLabel
        onClick={e => e.preventDefault()}
        data-cy="labels-filter-button"
        isFiltersDisabled={isFiltersDisabled}
      >
        Labels <FilterFilled style={{color: isFilterApplied ? Colors.purple : Colors.slate500}} />
      </StyledFilterLabel>
    </StyledFilterDropdown>
  );
};

export default LabelsFilter;
