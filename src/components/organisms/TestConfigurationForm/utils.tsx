import {NamePath} from 'antd/lib/form/interface';

export type SourceType = 'git' | 'custom' | 'file-uri' | 'string';

export type Fields = Record<SourceType, React.FC<Partial<Props>>>;

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
  additionalFields: Fields,
  props: Partial<Props>
) => JSX.Element | null = (source, additionalFields, props = {}) => {
  if (!source) {
    return null;
  }

  const AdditionalFieldsComponent = additionalFields[source];

  if (!AdditionalFieldsComponent) {
    return null;
  }

  return <AdditionalFieldsComponent {...props} />;
};
