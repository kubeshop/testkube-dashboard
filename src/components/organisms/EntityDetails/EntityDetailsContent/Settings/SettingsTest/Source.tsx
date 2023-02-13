import {useContext, useState} from 'react';

import {Form, Input, Select} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {FormItem, Text} from '@custom-antd';

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

import Colors from '@styles/Colors';

import {EntityDetailsContext} from '@contexts';

import {StyledFormItem, StyledSpace} from '../Settings.styled';

const dummySecret = '******';

const additionalFields: any = {
  'git-dir': gitFormFieldsEdit,
  'git-file': gitFormFieldsEdit,
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
    ...testSourceBaseOptions.filter(option => selectedExecutor?.executor?.contentTypes?.includes(String(option.value))),
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
            Learn more about{' '}
            <a href={testSourceLink} target="_blank">
              test sources
            </a>
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
                    {renderFormItems(additionalFields[testSourceValue], {
                      onFileChange: file => onFileChange(file, form),
                    })}
                  </StyledSpace>
                );
              }
            }}
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {({setFieldValue, getFieldValue}) => {
              const testSourceValue: string = getFieldValue('testSource');

              if (testSourceValue === 'git-dir' || testSourceValue === 'git-file') {
                return (
                  <>
                    <FormItem name="token" label="Git Token">
                      <Input.Password placeholder="Git Token" disabled={!clearedToken} />
                    </FormItem>
                    {!clearedToken ? (
                      <Text
                        style={{cursor: 'pointer', marginTop: '5px'}}
                        className="middle regular"
                        color={Colors.indigo400}
                        onClick={() => {
                          setFieldValue('token', '');
                          setClearedToken(true);
                        }}
                      >
                        Remove this token
                      </Text>
                    ) : null}
                  </>
                );
              }
            }}
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {({setFieldValue, getFieldValue}) => {
              const testSourceValue: string = getFieldValue('testSource');

              if (testSourceValue === 'git-dir' || testSourceValue === 'git-file') {
                return (
                  <>
                    <FormItem name="username" label="Git Username">
                      <Input.Password placeholder="Git Username" disabled={!clearedUsername} />
                    </FormItem>
                    {!clearedUsername ? (
                      <Text
                        style={{cursor: 'pointer', marginTop: '5px'}}
                        className="middle regular"
                        color={Colors.indigo400}
                        onClick={() => {
                          setFieldValue('username', '');
                          setClearedUsername(true);
                        }}
                      >
                        Remove username
                      </Text>
                    ) : null}
                  </>
                );
              }
            }}
          </Form.Item>
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default Source;
