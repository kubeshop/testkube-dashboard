import {KeyboardEventHandler, useContext, useEffect, useState} from 'react';

import {Space} from 'antd';

import {FilterFilled} from '@ant-design/icons';

import {Entity, EntityArray} from '@models/entityMap';
import {FilterProps} from '@models/filters';

import {Button, Input, Title} from '@custom-antd';

import {notificationCall} from '@molecules';
import {FilterMenuFooter, StyledFilterDropdown, StyledFilterLabel, StyledFilterMenu} from '@molecules/FilterMenu';

import Colors from '@styles/Colors';

import {MainContext} from '@contexts';

import {EmptyButton, StyledKeyValueRow, StyledLabelsMenuContainer} from './LabelsFilter.styled';

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
    const resultedFilters: string[] = [];

    if (JSON.stringify(labelsMapping) === JSON.stringify([defaultKeyValuePair])) {
      onVisibleChange(false);
      return;
    }

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

    if (resultedFilters.length !== labelsMapping.length) {
      notificationCall('failed', `Incorrect labels input`);
      return;
    }

    dispatch(setFilters({...filters, page: 0, selector: resultedFilters}));
    onVisibleChange(false);
  };

  const resetFilters = () => {
    setLabelsMapping([defaultKeyValuePair]);
    onVisibleChange(false);
    dispatch(setFilters({...filters, page: 0, selector: []}));
  };

  const handleKeyDown: KeyboardEventHandler<HTMLUListElement> = event => {
    if (event.key === 'Enter') {
      applyFilters();
    }
  };

  const menu = (
    <StyledFilterMenu onClick={onMenuClick} data-cy="labels-filter-dropdown" onKeyDown={handleKeyDown}>
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
    <Space>
      <StyledFilterDropdown
        overlay={menu}
        trigger={['click']}
        placement="bottom"
        onVisibleChange={onVisibleChange}
        visible={isVisible}
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
    </Space>
  );
};

export default LabelsFilter;
