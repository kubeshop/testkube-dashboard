import {useCallback, useMemo, useState} from 'react';

import {FilterFilled} from '@ant-design/icons';

import {Button, Input, Title} from '@custom-antd';

import {EntityFilters} from '@models/entity';
import {Entity} from '@models/entityMap';

import {FilterMenuFooter, StyledFilterDropdown, StyledFilterLabel, StyledFilterMenu} from '@molecules/FilterMenu';

import {initialPageSize} from '@redux/initialState';

import Colors from '@styles/Colors';

import {encodeSelectorArray} from '@utils/selectors';

import * as S from './LabelsFilter.styled';

const defaultKeyValuePair: Entity = {
  key: '',
  value: '',
};

const LabelsFilter: React.FC<EntityFilters> = props => {
  const {disabled, filters, setFilters} = props;

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

  const onDeleteRow = useCallback(
    (index: number) => {
      setLabelsMapping([...labelsMapping.slice(0, index), ...labelsMapping.slice(index + 1)]);
    },
    [labelsMapping]
  );

  const onKeyChange = useCallback(
    (key: string, index: number) => {
      setLabelsMapping([
        ...labelsMapping.slice(0, index),
        {key, value: labelsMapping[index].value},
        ...labelsMapping.slice(index + 1),
      ]);
    },
    [labelsMapping]
  );

  const onValueChange = useCallback(
    (value: string, index: number) => {
      setLabelsMapping([
        ...labelsMapping.slice(0, index),
        {key: labelsMapping[index].key, value},
        ...labelsMapping.slice(index + 1),
      ]);
    },
    [labelsMapping]
  );

  const resetFilters = useCallback(() => {
    setLabelsMapping([defaultKeyValuePair]);
    onOpenChange(false);
    setFilters({...filters, selector: '', pageSize: initialPageSize});
  }, [filters, onOpenChange, setFilters]);

  const renderedKeyValueInputs = useMemo(
    () =>
      labelsMapping.map((item, index) => {
        const key = `key-value-pair${index}`;

        return (
          <S.KeyValueRow key={key}>
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
              <S.EmptyButton />
            )}
          </S.KeyValueRow>
        );
      }),
    [labelsMapping, onDeleteRow, onKeyChange, onValueChange]
  );

  const menu = useMemo(
    () => (
      <StyledFilterMenu
        data-cy="labels-filter-dropdown"
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

  return (
    <StyledFilterDropdown
      overlay={menu}
      trigger={['click']}
      placement="bottom"
      onOpenChange={onOpenChange}
      open={isVisible}
      disabled={disabled}
    >
      <StyledFilterLabel data-cy="labels-filter-button" $disabled={disabled} onClick={e => e.preventDefault()}>
        Labels <FilterFilled style={{color: filters.selector.length > 0 ? Colors.purple : Colors.slate500}} />
      </StyledFilterLabel>
    </StyledFilterDropdown>
  );
};

export default LabelsFilter;
