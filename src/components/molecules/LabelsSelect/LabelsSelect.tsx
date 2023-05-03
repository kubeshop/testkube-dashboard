import React, {useContext} from 'react';

import {Option} from '@models/form';

import {CreatableMultiSelect} from '@atoms';
import {LabelsMultiValueLabel, LabelsOption} from '@atoms/CreatableMultiSelect/CustomComponents';

import {PollingIntervals} from '@utils/numbers';

import {useGetLabelsQuery} from '@services/labels';

import {Permissions, usePermission} from '@permissions/base';

import {MainContext} from '@contexts';

import {composeLabels} from './utils';

type LabelsSelectProps = {
  onChange?: (value: readonly Option[]) => void;
  defaultLabels?: readonly Option[];
  options?: {[key: string]: string[]};
  placeholder?: string;
  validation?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
};

const isValidLabel = (value: string) => {
  const match = value?.match(
    /(([A-Za-z0-9][-A-Za-z0-9_./]*)?[A-Za-z0-9]:\s?(([A-Za-z0-9][-A-Za-z0-9_.]*)?[A-Za-z0-9])?)/g
  );

  if (match) {
    return match[0] === value;
  }

  return false;
};

const LabelsSelect: React.FC<LabelsSelectProps> = props => {
  const {onChange, defaultLabels, options, placeholder = 'Add or create new labels', validation, menuPlacement} = props;
  // TODO: Check if it's actually expected, as it's used in multiple places
  const isSelectDisabled = !usePermission(Permissions.editEntity);

  const {isClusterAvailable} = useContext(MainContext);

  const {data, isFetching} = useGetLabelsQuery(null, {
    pollingInterval: PollingIntervals.default,
    skip: Boolean(options) || !isClusterAvailable,
  });

  const formattedDefaultLabels = composeLabels(defaultLabels);

  const formattedOptions: Option[] = Object.entries(options || data || {})
    .map(([key, value]) => {
      return value.map(item => {
        const labelString = `${key}${item ? `:${item}` : ''}`;

        return {
          label: labelString,
          value: labelString,
        };
      });
    })
    .flat();

  return (
    <CreatableMultiSelect
      onChange={onChange}
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
      defaultValue={formattedDefaultLabels}
      options={formattedOptions}
      CustomOptionComponent={LabelsOption}
      CustomMultiValueLabelComponent={LabelsMultiValueLabel}
      validateCreation={isValidLabel}
      isLoading={isFetching}
      validation={validation}
      menuPlacement={menuPlacement}
      dataTest="labels"
      disabled={isSelectDisabled}
    />
  );
};

export default LabelsSelect;
