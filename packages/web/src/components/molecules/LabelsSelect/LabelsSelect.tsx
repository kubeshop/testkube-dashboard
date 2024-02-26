import React, {useMemo} from 'react';

import {CreatableMultiSelect} from '@atoms';
import {LabelsMultiValueLabel, LabelsOption} from '@atoms/CreatableMultiSelect/CustomComponents';

import {useLastCallback} from '@hooks/useLastCallback';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {Option} from '@models/form';

import {useGetLabelsQuery} from '@services/labels';

import {PollingIntervals} from '@utils/numbers';

import {labelRegex} from './utils';

type LabelsSelectProps = {
  id?: string;
  value?: string[];
  onChange?: (value: readonly string[]) => void;
  options?: string[];
  placeholder?: string;
  validation?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  disabled?: boolean;
  stylePlaceholderAsValue?: boolean;
};

const isValidLabel = (value?: string) => {
  return value != null && labelRegex.test(value);
};

const getLabelKey = (label: string) => label.match(/^([^:]+:?)/)?.[0];
const isLabelKey = (label: string, keyWithColon?: string) => Boolean(keyWithColon && label.startsWith(keyWithColon));

const LabelsSelect: React.FC<LabelsSelectProps> = props => {
  const {
    id,
    onChange,
    value,
    options,
    placeholder = 'Add or create new labels',
    validation,
    menuPlacement,
    disabled,
    stylePlaceholderAsValue,
  } = props;
  const isClusterAvailable = useSystemAccess(SystemAccess.agent);

  // TODO: Extract it outside?
  const {data, isFetching} = useGetLabelsQuery(null, {
    pollingInterval: PollingIntervals.default,
    skip: Boolean(options) || !isClusterAvailable,
    refetchOnMountOrArgChange: true,
  });

  const formattedValue = useMemo(() => (value || []).map(label => ({label, value: label})), [value]);

  const formattedOptions: Option[] = useMemo(() => {
    const finalOptions =
      options ||
      Object.entries(data || {}).flatMap(([key, items]) => items.map(item => `${key}${item ? `:${item}` : ''}`));
    return finalOptions.map(label => ({label, value: label}));
  }, [options, data]);

  const change = useLastCallback((newValue: readonly Option[]) => onChange?.(newValue.map(x => x.value as string)));
  const isOptionDisabled = useMemo(
    () => (option: Option, selected: readonly Option[]) => {
      const key = getLabelKey(option.label);
      return Boolean(key) && selected.some(x => isLabelKey(`${x.value}`, key));
    },
    []
  );
  const formatCreateLabel = useMemo(
    () => (inputString: string) => {
      if (typeof inputString === 'string' && inputString.includes(':')) {
        if (!isValidLabel(inputString)) {
          return 'Incorrect label value';
        }

        const key = getLabelKey(inputString)!;
        if (value?.some(x => x.startsWith(`${key}:`))) {
          return `The label may have only a single value for specified key (${key}:)`;
        }

        return `Create ${inputString}`;
      }

      return 'Create: You need to add a : separator to create this label';
    },
    [value]
  );

  return (
    <CreatableMultiSelect
      id={id}
      value={formattedValue}
      onChange={change}
      placeholder={placeholder}
      isOptionDisabled={isOptionDisabled}
      formatCreateLabel={formatCreateLabel}
      options={formattedOptions}
      CustomOptionComponent={LabelsOption}
      CustomMultiValueLabelComponent={LabelsMultiValueLabel}
      validateCreation={isValidLabel}
      isLoading={isFetching}
      validation={validation}
      menuPlacement={menuPlacement}
      dataTest="labels"
      disabled={disabled}
      stylePlaceholderAsValue={stylePlaceholderAsValue}
    />
  );
};

export default LabelsSelect;
