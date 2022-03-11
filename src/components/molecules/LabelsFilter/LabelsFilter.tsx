import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';

import {Checkbox, Dropdown, Menu, Space} from 'antd';

import {DownOutlined} from '@ant-design/icons';

import {FilterProps} from '@models/filters';
import {LabelKey} from '@models/labels';

import {useAppSelector} from '@redux/hooks';
import {selectLabels} from '@redux/reducers/labelsSlice';

import AppliedLabels from './AppliedLabels';
import {StyledLabelsFilterMenu} from './LabelsFilter.styled';

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
        <Menu.Item key={label}>
          <Checkbox
            checked={filters.selector.includes(label)}
            onChange={() => {
              return onLabelChange(label);
            }}
          >
            {label}
          </Checkbox>
        </Menu.Item>
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

  const menu = <StyledLabelsFilterMenu onClick={onMenuClick}>{renderedLabels}</StyledLabelsFilterMenu>;

  if (!labels || !labels.length) {
    return null;
  }

  return (
    <Space size={20}>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        placement="bottomCenter"
        onVisibleChange={onVisibleChange}
        visible={isVisible}
      >
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          Label <DownOutlined />
        </a>
      </Dropdown>
      {appliedLabels && appliedLabels.length ? (
        <AppliedLabels appliedLabels={appliedLabels} onLabelChange={onLabelChange} />
      ) : null}
    </Space>
  );
};

export default LabelsFilter;
