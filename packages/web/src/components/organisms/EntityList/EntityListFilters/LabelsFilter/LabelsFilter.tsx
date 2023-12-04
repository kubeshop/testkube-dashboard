import {useEffect, useMemo, useState} from 'react';

import {FilterFilled} from '@ant-design/icons';

import {Button, Title} from '@custom-antd';

import usePressEnter from '@hooks/usePressEnter';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Entity} from '@models/entityMap';
import {FilterProps} from '@models/filters';

import {FilterMenuFooter, StyledFilterDropdown, StyledFilterLabel, StyledFilterMenu} from '@molecules/FilterMenu';

import {initialPageSize} from '@redux/initialState';

import {useGetLabelsQuery} from '@services/labels';

import {PollingIntervals} from '@src/utils/numbers';

import Colors from '@styles/Colors';

import {decodeSelectorArray, encodeSelectorArray} from '@utils/selectors';

import {AutoComplete, EmptyButton, StyledKeyValueRow, StyledLabelsMenuContainer} from './LabelsFilter.styled';

const defaultKeyValuePair: Entity = {
  key: '',
  value: '',
};

const LabelsFilter: React.FC<FilterProps> = props => {
  const {setFilters, filters, isFiltersDisabled, width} = props;
  const isClusterAvailable = useSystemAccess(SystemAccess.agent);

  const {data} = useGetLabelsQuery(null, {
    pollingInterval: PollingIntervals.default,
    skip: !isClusterAvailable,
  });
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

  const keysLabels = useMemo(() => Object.keys(data ?? {}).map(key => ({key, label: key, value: key})), [data]);

  const valuesLabels = useMemo(
    () => (data ? keysLabels.map(item => data[item.key].map(v => ({key: item.key, value: v}))).flat() : []),
    [keysLabels]
  );

  const renderKeyValueInputs = useMemo(
    () =>
      labelsMapping.map((item, index) => {
        const key = `key-value-pair${index}`;

        const keyOptions = keysLabels.filter(f => f.key.startsWith(item.key));

        const valuesOptions = valuesLabels
          .filter(f => f.key === item.key && f.value.startsWith(item.value))
          .map(v => ({key: v.value, label: v.value, value: v.value}));

        return (
          <StyledKeyValueRow key={key}>
            <AutoComplete
              width="220px"
              options={keyOptions}
              onChange={event => onKeyChange(event, index)}
              value={item.key}
              data-testid={`key-input-${index}`}
              placeholder="Key"
            />
            <AutoComplete
              width="220px"
              options={valuesOptions}
              onChange={event => onValueChange(event, index)}
              value={item.value}
              data-testid={`value-input-${index}`}
              placeholder="Value"
            />
            {index > 0 ? (
              <Button $customType="tertiary" onClick={() => onDeleteRow(index)} data-testid={`delete-row-${index}`}>
                &#10005;
              </Button>
            ) : (
              <EmptyButton />
            )}
          </StyledKeyValueRow>
        );
      }),
    [labelsMapping, keysLabels, valuesLabels]
  );

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
      data-testid="labels-filter-dropdown"
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
        data-testid="labels-filter-button"
        isFiltersDisabled={isFiltersDisabled}
      >
        Labels <FilterFilled style={{color: isFilterApplied ? Colors.purple : Colors.slate500}} />
      </StyledFilterLabel>
    </StyledFilterDropdown>
  );
};

export default LabelsFilter;
