import {useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Space} from 'antd';

import {FilterFilled} from '@ant-design/icons';

import {FilterProps} from '@models/filters';

import {Input} from '@custom-antd';

import {
  AppliedFiltersNotification,
  FilterMenuFooter,
  StyledFilterDropdown,
  StyledFilterLabel,
  StyledFilterMenu,
} from '@molecules/FilterMenu';

import {
  EmptyButton,
  StyledAddRowButton,
  StyledDeleteRowButton,
  StyledKeyValueLabel,
  StyledKeyValueRow,
  StyledLabelsMenuContainer,
  StyledTitle,
} from './LabelsFilter.styled';

type LabelFilterKeyValuePairType = {
  key: string;
  value: string;
};

const defaultKeyValuePair: LabelFilterKeyValuePairType = {
  key: '',
  value: '',
};

const defaultLabelsMapping = Array(1).fill(defaultKeyValuePair);

const LabelsFilter: React.FC<FilterProps> = props => {
  const {setFilters, filters} = props;

  const dispatch = useDispatch();

  const defaultLabels = useMemo(() => (filters && filters.selector) || [], [filters]);

  const [isVisible, setVisibilityState] = useState(false);
  const [labelsMapping, setLabelsMapping] = useState<LabelFilterKeyValuePairType[]>(defaultLabelsMapping);

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
  const renderKeyValueInputs = labelsMapping.map((item, index) => (
    <StyledKeyValueRow>
      <Input width="220px" onChange={event => onKeyChange(event.target.value, index)} value={item.key} />
      <Input width="220px" onChange={event => onValueChange(event.target.value, index)} value={item.value} />
      {index > 0 ? <StyledDeleteRowButton onClick={() => onDeleteRow(index)} /> : <EmptyButton />}
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
    setLabelsMapping(defaultLabelsMapping);
    dispatch(setFilters({...filters, page: 0, selector: []}));
  };
  const menu = (
    <StyledFilterMenu onClick={onMenuClick}>
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
      >
        <StyledFilterLabel onClick={e => e.preventDefault()}>
          {isFilterApplied ? <AppliedFiltersNotification /> : null}
          Labels <FilterFilled />
        </StyledFilterLabel>
      </StyledFilterDropdown>
    </Space>
  );
};

export default LabelsFilter;
