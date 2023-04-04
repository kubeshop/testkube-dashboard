export const getAdditionalFieldsComponent: (
  source: string | null,
  props: any,
  additionalFields: {[key: string]: React.FC<any>}
) => JSX.Element | null = (source, props = {}, additionalFields) => {
  if (!source) {
    return null;
  }

  const AdditionalFieldsComponent = additionalFields[source];

  if (!AdditionalFieldsComponent) {
    return null;
  }

  return <AdditionalFieldsComponent {...props} />;
};
