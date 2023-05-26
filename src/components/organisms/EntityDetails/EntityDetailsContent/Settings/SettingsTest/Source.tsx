import {memo, useMemo, useState} from 'react';

import {Form, Select} from 'antd';

import {ExternalLink} from '@atoms';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {Test} from '@models/test';

import {ConfigurationCard} from '@molecules';

import {
  CustomSourceEditFormFields,
  FileContentFields,
  SourceEditFormFields,
  StringContentFields,
} from '@organisms/TestConfigurationForm';
import {Props, SourceFields, SourceType, getAdditionalFieldsComponent} from '@organisms/TestConfigurationForm/utils';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {selectSources} from '@redux/reducers/sourcesSlice';

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
  entityDetails: Test;
  updateTest: (data: any) => void;
};

type SourceFormValues = GetSourceFormValues & {testSource: string};

const Source: React.FC<SourceProps> = props => {
  const {entityDetails, updateTest} = props;
  const {type} = entityDetails;

  const mayEdit = usePermission(Permissions.editEntity);

  const executors = useAppSelector(selectExecutors);
  const testSources = useAppSelector(selectSources);

  const remappedCustomTestSources = remapTestSources(testSources);

  const selectedExecutor = useMemo(
    () => executors.find(executor => executor.executor.types?.includes(type)),
    [executors, type]
  );

  const {source, ...additionalFormValues} = getSourceFormValues(entityDetails, testSources);

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
      content: getSourcePayload(values, testSources),
      ...getCustomSourceField(newTestSource),
    });
  };

  return (
    <Form
      form={form}
      name="test-settings-source"
      initialValues={{testSource: source, ...additionalFormValues}}
      layout="vertical"
      labelAlign="right"
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Source"
        description="Define the source for your test"
        onConfirm={onSave}
        onCancel={() => {
          form.resetFields();
          setIsClearedUsername(!additionalFormValues.username);
          setIsClearedToken(!additionalFormValues.token);
        }}
        footerText={
          <>
            Learn more about <ExternalLink href={externalLinks.sourcesDocumentation}>test sources</ExternalLink>
          </>
        }
        forceEnableButtons={Boolean(
          (isClearedToken && additionalFormValues.token) || (isClearedUsername && additionalFormValues.username)
        )}
        enabled={mayEdit}
      >
        <FullWidthSpace size={24} direction="vertical">
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
        </FullWidthSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default memo(Source);
