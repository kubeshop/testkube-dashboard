import {Option} from '@models/form';
import {pathPlaceholders} from '@wizards/AddTestWizard/utils';

import {CustomSource, SourceType} from '@models';

import {SourceInputExecutor} from './types';

export const getPathPlaceholder = (executor?: SourceInputExecutor): string => {
  return pathPlaceholders[executor?.executor?.meta?.iconURI!] || 'e.g.: tests/path';
};

export const convertCustomSourceToOption = (source: CustomSource): Option => ({
  label: `Git source: ${source.name}`,
  value: `$custom:${source.name}`,
});

export const serializeSourceType = (source: SourceType | CustomSource | null | undefined): string | null => (
  source
    ? typeof source === 'string'
      ? source
      : convertCustomSourceToOption(source).value as string
    : null
);

export const extractCustomSourceName = (value: string): string | undefined => (
  (value.match(/^\$custom:(.+)/) || [])[1]
);

export const deserializeSourceType = <T extends CustomSource>(
  sourceType: SourceType | string,
  sources: T[],
): T | SourceType => {
  const sourceName = extractCustomSourceName(sourceType);
  return sources.find(source => source.name === sourceName) || (sourceType as SourceType);
};

export const isAnySourceTypeSupported = (executor: SourceInputExecutor, types: SourceType[]): boolean => (
  types.some(type => executor.executor?.contentTypes?.includes(type))
);

export const isSourceTypeSupported = (executor: SourceInputExecutor, type: SourceType): boolean => Boolean(
  type === SourceType.git
    ? isAnySourceTypeSupported(executor, [SourceType.git, SourceType.gitFile, SourceType.gitDir])
    : isAnySourceTypeSupported(executor, [type])
);
