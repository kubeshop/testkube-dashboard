import {NamePath} from 'antd/lib/form/interface';

export type SourceType = 'git' | 'custom' | 'file-uri' | 'string';

export type SourceFields = Record<SourceType, React.FC<Partial<Props>>>;

export type Props = {
  executorType: string;
  getFieldValue: (name: NamePath) => string;
  isClearedToken: boolean;
  isClearedUsername: boolean;
  setIsClearedToken: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClearedUsername: React.Dispatch<React.SetStateAction<boolean>>;
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
