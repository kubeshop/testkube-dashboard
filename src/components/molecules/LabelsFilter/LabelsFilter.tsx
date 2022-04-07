import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Space} from 'antd';

import {FilterFilled} from '@ant-design/icons';

import {FilterProps} from '@models/filters';
import {LabelKey} from '@models/labels';

import {useAppSelector} from '@redux/hooks';
import {selectLabels} from '@redux/reducers/labelsSlice';

import {
  AppliedFiltersNotification,
  FilterMenuFooter,
  StyledFilterCheckbox,
  StyledFilterDropdown,
  StyledFilterLabel,
  StyledFilterMenu,
  StyledFilterMenuItem,
} from '@molecules/FilterMenu';

import './LabelsFilter.styled';

const LabelsFilter: React.FC<FilterProps> = props => {
  const {setFilters, filters} = props;

  const dispatch = useDispatch();

  const labels: LabelKey[] = Object.keys(useAppSelector(selectLabels));

  const defaultLabels = useMemo(() => (filters && filters.selector) || [], [filters]);

  const [isVisible, setVisibilityState] = useState(false);
  const [labelsMapping, setLabelsMapping] = useState<LabelKey[]>(defaultLabels);

  const onVisibleChange = (flag: boolean) => {
    setVisibilityState(flag);
  };

  const onMenuClick = () => {};

  const onLabelChange = (label: LabelKey) => {
    if (labelsMapping.includes(label)) {
      return setLabelsMapping(
        labelsMapping.filter(currentLabel => {
          return label !== currentLabel;
        })
      );
    }

    setLabelsMapping([...labelsMapping, label]);
  };

  const renderedLabels = useMemo(() => {
    if (!labels || !labels.length) {
      return null;
    }

    return labels.map(label => {
      return (
        <StyledFilterMenuItem key={label}>
          <StyledFilterCheckbox
            checked={filters.selector.includes(label)}
            onChange={() => {
              return onLabelChange(label);
            }}
          >
            {label}
          </StyledFilterCheckbox>
        </StyledFilterMenuItem>
      );
    });
  }, [labels, filters, labelsMapping, defaultLabels]);

  const appliedLabels: LabelKey[] | null = useMemo(() => {
    if (!labels || !labels.length) {
      return null;
    }

    return labels
      .map((label: LabelKey) => {
        return filters.selector.includes(label) ? label : '';
      })
      .filter(label => label);
  }, [labels, filters, labelsMapping, defaultLabels]);

  useEffect(() => {
    dispatch(setFilters({...filters, selector: labelsMapping}));
  }, [labelsMapping]);

  useEffect(() => {
    setLabelsMapping(defaultLabels);
  }, [defaultLabels]);

  const menu = (
    <StyledFilterMenu onClick={onMenuClick}>
      {renderedLabels}
      <FilterMenuFooter onOk={() => onVisibleChange(false)} onReset={() => setLabelsMapping([])} />
    </StyledFilterMenu>
  );

  if (!labels || !labels.length) {
    return null;
  }

  const isLabelsApplied = appliedLabels && appliedLabels.length > 0;

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
          {isLabelsApplied ? <AppliedFiltersNotification /> : null}
          Labels <FilterFilled />
        </StyledFilterLabel>
      </StyledFilterDropdown>
    </Space>
  );
};

export default LabelsFilter;
