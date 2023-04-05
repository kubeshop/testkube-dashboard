import {FC} from 'react';

import {Text} from '@custom-antd';

import {CustomSource, isGitSourceType, SourceType, Source} from '@models';

import {SourceInputExecutor} from './types';
import {GitSourceInput} from './GitSourceInput';
import {GitCustomSourceInput} from './GitCustomSourceInput';
import {StringSourceInput} from './StringSourceInput';
import {FileUriSourceInput} from './FileUriSourceInput';

export interface SourceInputProps {
  executor: SourceInputExecutor;
  value?: Source;
  source?: CustomSource;
  onChange?: (value: Source) => void;
}

export const SourceInput: FC<SourceInputProps> = (
  {executor, value, source, onChange},
) => {
  const git = isGitSourceType(value?.type);

  // TODO: Make label's "for"
  if (source) {
    if (git) {
      return <GitCustomSourceInput executor={executor} value={value} onChange={onChange} />;
    }
    return <Text>No additional data needs to be provided.</Text>;
  }
  if (git) {
    return <GitSourceInput executor={executor} value={value} onChange={onChange} />;
  }
  if (value?.type === SourceType.string) {
    return <StringSourceInput value={value} onChange={onChange} />;
  }
  if (value?.type === SourceType.fileUri) {
    return <FileUriSourceInput value={value} onChange={onChange} />;
  }

  return null;
};
