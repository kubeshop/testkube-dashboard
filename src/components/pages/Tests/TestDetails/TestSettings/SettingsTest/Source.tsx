import {memo, useMemo, useState} from 'react';

import {Form, Select} from 'antd';

import {ExternalLink} from '@atoms';

import {FormItem} from '@custom-antd';

import {Test} from '@models/test';

import {CardForm} from '@organisms';
import {
  CustomSourceEditFormFields,
  FileContentFields,
  SourceEditFormFields,
  StringContentFields,
} from '@organisms/TestConfigurationForm';
import {Props, SourceFields, SourceType, getAdditionalFieldsComponent} from '@organisms/TestConfigurationForm/utils';

import {Permissions, usePermission} from '@permissions/base';

import {useExecutorsPick} from '@store/executors';
import {useSourcesPick} from '@store/sources';

import {externalLinks} from '@utils/externalLinks';
import {required} from '@utils/form';
import {
  GetSourceFormValues,
  getCustomSourceField,
  getSourceFieldValue,
  getSourceFormValues,
  getSourcePayload,
  remapTestSources,
  testSourceBaseOptions,
} from '@utils/sources';

const additionalFields: SourceFields = {
  git: SourceEditFormFields,
  'file-uri': FileContentFields,
  custom: CustomSourceEditFormFields,
  string: StringContentFields,
};

type SourceProps = {
  details: Test;
  updateTest: (data: any) => void;
};

type SourceFormValues = GetSourceFormValues & {testSource: string};

const Source: React.FC<SourceProps> = props => {
  const {details, updateTest} = props;
  const {type} = details;

  const mayEdit = usePermission(Permissions.editEntity);

  const {executors = []} = useExecutorsPick('executors');
  const {sources} = useSourcesPick('sources');

  const remappedCustomTestSources = useMemo(() => remapTestSources(sources || []), [sources]);

  const selectedExecutor = useMemo(
    () => executors.find(executor => executor.executor.types?.includes(type)),
    [executors, type]
  );

  const {source, ...additionalFormValues} = getSourceFormValues(details, sources || []);

  const [form] = Form.useForm<SourceFormValues>();

  const sourcesOptions = [
    ...remappedCustomTestSources,
    ...testSourceBaseOptions.filter(
      option =>
        selectedExecutor?.executor?.contentTypes?.includes(String(option.value)) ||
        !selectedExecutor?.executor?.contentTypes?.length
    ),
  ];

  const [isClearedToken, setIsClearedToken] = useState(!additionalFormValues.token);
  const [isClearedUsername, setIsClearedUsername] = useState(!additionalFormValues.username);

  const onSave = () => {
    const values = form.getFieldsValue();
    const {testSource: newTestSource} = values;

    return updateTest({
      content: getSourcePayload(values, sources || []),
      ...getCustomSourceField(newTestSource),
    });
  };

  const onCancel = () => {
    form.resetFields();
    setIsClearedUsername(!additionalFormValues.username);
    setIsClearedToken(!additionalFormValues.token);
  };

  const footer = (
    <>
      Learn more about <ExternalLink href={externalLinks.sourcesDocumentation}>test sources</ExternalLink>
    </>
  );

  return (
    <CardForm
      name="test-settings-source"
      title="Source"
      description="Define the source for your test"
      footer={footer}
      labelAlign="right"
      form={form}
      initialValues={{testSource: source, ...additionalFormValues}}
      disabled={!mayEdit}
      wasTouched={Boolean(
        (isClearedToken && additionalFormValues.token) || (isClearedUsername && additionalFormValues.username)
      )}
      onConfirm={onSave}
      onCancel={onCancel}
    >
      <FormItem name="testSource" rules={[required]}>
        <Select showSearch options={sourcesOptions} />
      </FormItem>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
      >
        {({getFieldValue}) => {
          const testSource = getSourceFieldValue(getFieldValue);

          if (!testSource) {
            return null;
          }

          const executorType = selectedExecutor?.executor.meta?.iconURI || 'unknown';

          const childrenProps: Record<SourceType, Partial<Props>> = {
            git: {
              executorType,
              isClearedToken,
              isClearedUsername,
              setIsClearedToken,
              setIsClearedUsername,
              getFieldValue,
            },
            custom: {executorType},
            string: {},
            'file-uri': {},
          };

          return getAdditionalFieldsComponent(testSource, additionalFields, childrenProps[testSource]);
        }}
      </Form.Item>
    </CardForm>
  );
};

export default memo(Source);
