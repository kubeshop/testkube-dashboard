import {useContext, useMemo, useState} from 'react';

import {Form, Select} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {ExternalLink} from '@atoms';

import {ConfigurationCard, notificationCall} from '@molecules';

import {
  CustomFormFields,
  FileContentFields,
  SourceEditFormFields,
  StringContentFields,
} from '@organisms/TestConfigurationForm';
import {getAdditionalFieldsComponent} from '@organisms/TestConfigurationForm/utils';

import {testSourceLink} from '@utils/externalLinks';
import {required} from '@utils/form';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';
import {
  getCustomSourceField,
  getSourceFieldValue,
  getSourceFormValues,
  getSourcePayload,
  remapTestSources,
  testSourceBaseOptions,
} from '@utils/sources';

import {useUpdateTestMutation} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

import {StyledFormItem, StyledSpace} from '../Settings.styled';

const additionalFields: {[key: string]: React.FC<any>} = {
  git: SourceEditFormFields,
  'file-uri': FileContentFields,
  custom: CustomFormFields,
  string: StringContentFields,
};

const Source = () => {
  const {entityDetails} = useContext(EntityDetailsContext);

  const {type} = entityDetails;

  const executors = useAppSelector(selectExecutors);
  const testSources = useAppSelector(selectSources);

  const remappedCustomTestSources = remapTestSources(testSources);

  const selectedExecutor = useMemo(
    () => executors.find(executor => executor.executor.types?.includes(type)),
    [executors, type]
  );

  const {source, ...additionalFormValues} = getSourceFormValues(entityDetails, testSources);

  const [form] = Form.useForm();

  const sourcesOptions = [
    ...remappedCustomTestSources,
    ...testSourceBaseOptions.filter(
      option =>
        selectedExecutor?.executor?.contentTypes?.includes(String(option.value)) ||
        !selectedExecutor?.executor?.contentTypes?.length
    ),
  ];

  const [updateTest] = useUpdateTestMutation();

  const [isClearedToken, setIsClearedToken] = useState(!additionalFormValues.token);
  const [isClearedUsername, setIsClearedUsername] = useState(!additionalFormValues.username);

  const onSave = (values: any) => {
    const {testSource} = values;

    updateTest({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        content: getSourcePayload(values, testSources),
        ...getCustomSourceField(testSource, entityDetails.source),
      },
    })
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `Test source was successfully updated.`);
        });
      })
      .catch((err: any) => {
        displayDefaultErrorNotification(err);
      });
  };

  return (
    <Form
      form={form}
      name="test-settings-source"
      initialValues={{testSource: source, ...additionalFormValues}}
      layout="vertical"
      labelAlign="right"
      onFinish={onSave}
    >
      <ConfigurationCard
        title="Source"
        description="Define the source for your test"
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
          setIsClearedUsername(!additionalFormValues.username);
          setIsClearedToken(!additionalFormValues.token);
        }}
        footerText={
          <>
            Learn more about <ExternalLink href={testSourceLink}>test sources</ExternalLink>
          </>
        }
        forceEnableButtons={
          (isClearedToken && additionalFormValues.token) || (isClearedUsername && additionalFormValues.username)
        }
      >
        <StyledSpace size={24} direction="vertical">
          <StyledFormItem name="testSource" rules={[required]}>
            <Select showSearch options={sourcesOptions} />
          </StyledFormItem>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
          >
            {({getFieldValue}) => {
              const testSource = getSourceFieldValue(getFieldValue);

              const executorType = selectedExecutor?.executor.meta?.iconURI;

              const childrenProps: {[key: string]: Object} = {
                git: {executorType, isClearedToken, isClearedUsername, setIsClearedToken, setIsClearedUsername},
                custom: {executorType},
              };

              return getAdditionalFieldsComponent(testSource, childrenProps[testSource], additionalFields);
            }}
          </Form.Item>
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default Source;
