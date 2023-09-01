import React, {useContext, useMemo} from 'react';

import {CreatableMultiSelect} from '@atoms';
import {LabelsMultiValueLabel, LabelsOption} from '@atoms/CreatableMultiSelect/CustomComponents';

import {MainContext} from '@contexts';

import {useLastCallback} from '@hooks/useLastCallback';

import {Option} from '@models/form';

import {useGetLabelsQuery} from '@services/labels';

import {PollingIntervals} from '@utils/numbers';

import {labelRegex} from './utils';

type LabelsSelectProps = {
  value?: string[];
  onChange?: (value: readonly string[]) => void;
  options?: string[];
  placeholder?: string;
  validation?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  disabled?: boolean;
};

const isValidLabel = (value?: string) => {
  return value != null && labelRegex.test(value);
};

const LabelsSelect: React.FC<LabelsSelectProps> = props => {
  const {
    onChange,
    value,
    options,
    placeholder = 'Add or create new labels',
    validation,
    menuPlacement,
    disabled,
  } = props;
  const {isClusterAvailable} = useContext(MainContext);

  // TODO: Extract it outside?
  const {data, isFetching} = useGetLabelsQuery(null, {
    pollingInterval: PollingIntervals.default,
    skip: Boolean(options) || !isClusterAvailable,
  });

  const formattedValue = useMemo(() => (value || []).map(label => ({label, value: label})), [value]);

  const formattedOptions: Option[] = useMemo(() => {
    const finalOptions =
      options ||
      Object.entries(data || {}).flatMap(([key, items]) => items.map(item => `${key}${item ? `:${item}` : ''}`));
    return finalOptions.map(label => ({label, value: label}));
  }, [options, data]);

  const change = useLastCallback((newValue: readonly Option[]) => onChange?.(newValue.map(x => x.value as string)));

  return (
    <CreatableMultiSelect
      value={formattedValue}
      onChange={change}
      placeholder={placeholder}
      formatCreateLabel={(inputString: string) => {
        if (typeof inputString === 'string' && inputString.includes(':')) {
          if (!isValidLabel(inputString)) {
            return 'Incorrect label value';
          }

          return `Create ${inputString}`;
        }

        return 'Create: You need to add a : separator to create this label';
      }}
      options={formattedOptions}
      CustomOptionComponent={LabelsOption}
      CustomMultiValueLabelComponent={LabelsMultiValueLabel}
      validateCreation={isValidLabel}
      isLoading={isFetching}
      validation={validation}
      menuPlacement={menuPlacement}
      dataTest="labels"
      disabled={disabled}
    />
  );
};

export default LabelsSelect;
