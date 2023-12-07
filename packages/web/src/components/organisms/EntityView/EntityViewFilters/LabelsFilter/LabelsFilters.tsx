import {useCallback, useEffect, useMemo, useState} from 'react';

import {FilterFilled} from '@ant-design/icons';

import {Button, Title} from '@custom-antd';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {EntityFilters} from '@models/entity';
import {Entity} from '@models/entityMap';

import {FilterMenuFooter, StyledFilterDropdown, StyledFilterLabel, StyledFilterMenu} from '@molecules/FilterMenu';

import {initialPageSize} from '@redux/initialState';

import {useGetLabelsQuery} from '@services/labels';

import {PollingIntervals} from '@src/utils/numbers';

import Colors from '@styles/Colors';

import {decodeSelectorArray, encodeSelectorArray} from '@utils/selectors';

import KeyValueInput from './KeyValueInput';
import * as S from './LabelsFilter.styled';

const defaultKeyValuePair: Entity = {
  key: '',
  value: '',
};

const LabelsFilter: React.FC<EntityFilters> = props => {
  const {disabled, filters, setFilters} = props;

  const isClusterAvailable = useSystemAccess(SystemAccess.agent);

  const {data} = useGetLabelsQuery(null, {
    pollingInterval: PollingIntervals.default,
    skip: !isClusterAvailable,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [labelsMapping, setLabelsMapping] = useState<Entity[]>([]);

  const onOpenChange = useCallback((flag: boolean) => {
    setIsVisible(flag);
  }, []);

  const applyFilters = useCallback(() => {
    const selector = encodeSelectorArray(labelsMapping);
    setFilters({...filters, selector, pageSize: initialPageSize});
    onOpenChange(false);
  }, [filters, labelsMapping, onOpenChange, setFilters]);

  const onAddRow = useCallback(() => {
    setLabelsMapping([...labelsMapping, defaultKeyValuePair]);
  }, [labelsMapping]);

  const resetFilters = useCallback(() => {
    setLabelsMapping([defaultKeyValuePair]);
    onOpenChange(false);
    setFilters({...filters, selector: '', pageSize: initialPageSize});
  }, [filters, onOpenChange, setFilters]);

  const keysLabels = useMemo(() => Object.keys(data ?? {}).map(key => ({key, label: key, value: key})), [data]);

  const valuesLabels = useMemo(
    () => (data ? keysLabels.map(item => data[item.key].map(v => ({key: item.key, value: v}))).flat() : []),
    [data, keysLabels]
  );

  const renderedKeyValueInputs = useMemo(
    () =>
      labelsMapping.map((item, index) => {
        const key = `key-value-pair${index}`;

        const keyOptions = keysLabels.filter(f => f.key.startsWith(item.key));

        const valuesOptions = valuesLabels
          .filter(f => f.key === item.key && f.value.startsWith(item.value))
          .map(v => ({key: v.value, label: v.value, value: v.value}));

        return (
          <KeyValueInput
            key={key}
            index={index}
            keyOptions={keyOptions}
            valuesOptions={valuesOptions}
            itemKey={item.key}
            itemValue={item.value}
            labelsMapping={labelsMapping}
            setLabelsMapping={setLabelsMapping}
          />
        );
      }),
    [keysLabels, labelsMapping, valuesLabels]
  );

  const menu = useMemo(
    () => (
      <StyledFilterMenu
        data-testid="labels-filter-dropdown"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            applyFilters();
          }
        }}
      >
        <S.LabelsMenuContainer>
          <Title level={5}>Filter tests by Key Value pairs.</Title>
          {renderedKeyValueInputs}
          <Button $customType="secondary" onClick={onAddRow}>
            Add another row
          </Button>
        </S.LabelsMenuContainer>

        <FilterMenuFooter onOk={applyFilters} onReset={resetFilters} />
      </StyledFilterMenu>
    ),
    [applyFilters, onAddRow, renderedKeyValueInputs, resetFilters]
  );

  useEffect(() => {
    const mapping = decodeSelectorArray(filters.selector);
    setLabelsMapping(mapping.length === 0 ? [defaultKeyValuePair] : mapping);
  }, [filters.selector]);

  return (
    <StyledFilterDropdown
      overlay={menu}
      trigger={['click']}
      placement="bottom"
      onOpenChange={onOpenChange}
      open={isVisible}
      disabled={disabled}
    >
      <StyledFilterLabel data-testid="labels-filter-button" $disabled={disabled} onClick={e => e.preventDefault()}>
        Labels <FilterFilled style={{color: filters.selector.length > 0 ? Colors.purple : Colors.slate500}} />
      </StyledFilterLabel>
    </StyledFilterDropdown>
  );
};

export default LabelsFilter;
