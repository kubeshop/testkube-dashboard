import {useContext} from 'react';

import {Form, Select} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {ConfigurationCard, notificationCall} from '@molecules';

import {additionalFields} from '@wizards/AddTestWizard/steps/FirstStep';
import {
  getTestSourceSpecificFields,
  onFileChange,
  remapTestSources,
  testSourceBaseOptions,
} from '@wizards/AddTestWizard/utils';

import {renderFormItems, required} from '@utils/form';

import {EntityDetailsContext} from '@contexts';

import {useUpdateTestMutation} from '@src/services/tests';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@src/utils/notification';

import {StyledFormItem, StyledSpace} from '../Settings.styled';

const dummySecret = '******';

const Source = () => {
  const {entityDetails} = useContext(EntityDetailsContext);

  const testSources = useAppSelector(selectSources);

  const remappedCustomTestSources = remapTestSources(testSources);

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

    if (content?.repository?.tokenSecret) {
      secrets.token = dummySecret;
    }

    if (content?.repository?.usernameSecret) {
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

  const sourcesOptions = [...remappedCustomTestSources, ...testSourceBaseOptions];

  const [updateTest] = useUpdateTestMutation();

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
          notificationCall('passed', `Test source was succesfully updated.`);
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
        }}
        footerText={
          <>
            Learn more about{' '}
            <a
              href="https://kubeshop.github.io/testkube/using-testkube/tests/tests-creating/#test-source"
              target="_blank"
            >
              test sources
            </a>
          </>
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
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default Source;
