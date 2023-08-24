import {Dispatch, FC, SetStateAction} from 'react';

import {NamePath} from 'antd/lib/form/interface';

export type SourceType = 'git' | 'custom' | 'file-uri' | 'string';

export type SourceFields = Record<SourceType, FC<Partial<Props>>>;

export type Props = {
  executorType: string;
  getFieldValue: (name: NamePath) => string;
  isClearedToken: boolean;
  isClearedUsername: boolean;
  setIsClearedToken: Dispatch<SetStateAction<boolean>>;
  setIsClearedUsername: Dispatch<SetStateAction<boolean>>;
};

export const getAdditionalFieldsComponent: (
  source: SourceType,
  additionalFields: SourceFields,
  props: Partial<Props>
) => JSX.Element | null = (source, additionalFields, props = {}) => {
  const AdditionalFieldsComponent = additionalFields[source];

  if (!AdditionalFieldsComponent) {
    return null;
  }

  return <AdditionalFieldsComponent {...props} />;
};
