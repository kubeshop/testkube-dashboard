import {FC, useCallback, useMemo} from 'react';
import {Select} from 'antd';

import {Option} from '@models/form';
import {testSourceBaseOptions} from '@wizards/AddTestWizard/utils';

import {CustomSource, SourceType} from '@models';

import {
  convertCustomSourceToOption,
  deserializeSourceType,
  isSourceTypeSupported,
  serializeSourceType,
} from './utils';
import {SourceInputExecutor} from './types';

const baseSources = testSourceBaseOptions as Option[];

export interface SourceTypeInputProps {
  placeholder?: string;
  executor: SourceInputExecutor;
  sources?: CustomSource[];
  value?: CustomSource | SourceType;
  onChange?: (value: CustomSource | SourceType) => void;
}

export const SourceTypeInput: FC<SourceTypeInputProps> = (
  {placeholder, executor, sources, value, onChange},
) => {
  // Get list of custom test sources
  const customSources = useMemo(() => (
    (sources || [])
      .filter(source => isSourceTypeSupported(executor, source.type))
      .map(convertCustomSourceToOption)
  ), [sources, executor]);

  // Combine saved test sources with abstract for the executor
  const allSources = useMemo(() => [
    ...customSources,
    ...baseSources.filter(option => isSourceTypeSupported(executor, option.value as any)),
  ], [customSources, executor]);

  const change = useCallback((newKey: string) => {
    onChange?.(deserializeSourceType(newKey, sources || []));
  }, [onChange, sources]);

  // Build current key based on the value
  const key = useMemo(() => serializeSourceType(value), [value, sources]);

  return (
    <Select
      style={{width: '100%'}}
      value={key}
      onChange={change}
      options={allSources}
      placeholder={placeholder}
      showSearch
    />
  );
};
