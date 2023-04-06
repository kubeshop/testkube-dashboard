import {useContext, useState} from 'react';

import {Form, Select} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {ExternalLink} from '@atoms';

import {ConfigurationCard, notificationCall} from '@molecules';

import {
  customTypeFormFields,
  fileContentFormFields,
  getTestSourceSpecificFields,
  gitFormFieldsEdit,
  onFileChange,
  remapTestSources,
  stringContentFormFields,
  testSourceBaseOptions,
} from '@wizards/AddTestWizard/utils';

import {testSourceLink} from '@utils/externalLinks';
import {renderFormItems, required} from '@utils/form';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

import {StyledFormItem, StyledSpace} from '../Settings.styled';
import SecretFormItem from './SecretFormItem';

const dummySecret = '******';

const additionalFields: any = {
  git: gitFormFieldsEdit,
  'file-uri': fileContentFormFields,
  custom: customTypeFormFields,
  string: stringContentFormFields,
};

const Source = () => {
  const {entityDetails} = useContext(EntityDetailsContext);

  const {type} = entityDetails;

  const executors = useAppSelector(selectExecutors);
  const testSources = useAppSelector(selectSources);

  const remappedCustomTestSources = remapTestSources(testSources);

  const selectedExecutor = executors.find(executor => executor.executor.types?.includes(type));

  const getFormValues = () => {
    const {content} = entityDetails;

    if (entityDetails.source) {
      const sourceDetails = testSources.find(source => source.name === entityDetails.source);

      return {
        source: entityDetails.source,
        branch: sourceDetails?.repository.branch,
        path: sourceDetails?.repository.path,
      };
    }

    if (content.type === 'string') {
      return {
        source: content.type,
        string: content.data,
      };
    }

    const secrets: {token?: string; username?: string} = {};

    if (content?.repository?.tokenSecret?.name) {
      secrets.token = dummySecret;
    }

    if (content?.repository?.usernameSecret?.name) {
      secrets.username = dummySecret;
    }

    return {
      source: content.type,
      ...content.repository,
      ...secrets,
    };
  };

  const {source, ...additionalFormValues} = getFormValues();

  const [form] = Form.useForm();

  const sourcesOptions = [
    ...remappedCustomTestSources,
    ...testSourceBaseOptions.filter(option => {
      if (option.value === 'git') {
        return (
          selectedExecutor?.executor?.contentTypes?.includes('git-dir') ||
          selectedExecutor?.executor?.contentTypes?.includes('git-file')
        );
      }

      return selectedExecutor?.executor?.contentTypes?.includes(String(option.value));
    }),
  ];

  const [updateTest] = useUpdateTestMutation();

  const [clearedToken, setClearedToken] = useState(!additionalFormValues.token);
  const [clearedUsername, setClearedUsername] = useState(!additionalFormValues.username);

  const onSave = (values: any) => {
    const {testSource} = values;

    const isTestSourceCustomGitDir = testSource.includes('custom-git-dir');

    const testSourceSpecificFields = getTestSourceSpecificFields(values, isTestSourceCustomGitDir);

    if (isTestSourceCustomGitDir) {
      const isTestSourceExists = testSources.some(sourceItem => {
        return sourceItem.name === testSource.replace('$custom-git-dir-', '');
      });

      if (!isTestSourceExists) {
        notificationCall('failed', 'Provided test source does not exist');
        return;
      }
    }

    const requestDataContent = {
      ...(testSource === 'file-uri' ? {type: 'string'} : isTestSourceCustomGitDir ? {type: ''} : {type: testSource}),
      ...testSourceSpecificFields,
    };

    updateTest({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        content: requestDataContent,
        ...(isTestSourceCustomGitDir
          ? {source: testSource.replace('$custom-git-dir-', '')}
          : entityDetails.source
          ? {source: ''}
          : {}),
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
          setClearedUsername(!additionalFormValues.username);
          setClearedToken(!additionalFormValues.token);
        }}
        footerText={
          <>
            Learn more about <ExternalLink href={testSourceLink}>test sources</ExternalLink>
          </>
        }
        forceEnableButtons={
          (clearedToken && additionalFormValues.token) || (clearedUsername && additionalFormValues.token)
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
              let testSourceValue: string = getFieldValue('testSource');

              if (testSourceValue) {
                testSourceValue = !additionalFields[testSourceValue] ? 'custom' : testSourceValue;

                return (
                  <StyledSpace size={24} direction="vertical">
                    {renderFormItems(additionalFields[testSourceValue](selectedExecutor?.executor.meta?.iconURI), {
                      onFileChange: file => onFileChange(file, form),
                    })}
                  </StyledSpace>
                );
              }
            }}
          </Form.Item>
          <SecretFormItem
            name="token"
            label="Git Token"
            isClearedValue={clearedToken}
            setIsClearedValue={setClearedToken}
          />
          <SecretFormItem
            name="username"
            label="Git Username"
            isClearedValue={clearedUsername}
            setIsClearedValue={setClearedUsername}
          />
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default Source;
