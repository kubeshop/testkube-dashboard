import {useContext, useEffect, useState} from 'react';

import {Form} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import {Option} from '@models/form';

import {useAppSelector} from '@redux/hooks';
import {setRedirectTarget} from '@redux/reducers/configSlice';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {Button, Text} from '@custom-antd';

import {Hint, notificationCall} from '@molecules';
import {HintProps} from '@molecules/Hint/Hint';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import FirstStep from '@wizards/AddTestWizard/steps/FirstStep';
import {getTestSourceSpecificFields, onFileChange} from '@wizards/AddTestWizard/utils';

import {openCustomExecutorDocumentation} from '@utils/externalLinks';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useAddTestMutation} from '@services/tests';

import {AnalyticsContext, MainContext} from '@contexts';

import {StyledFormItem, StyledFormSpace} from './CreationModal.styled';
import {defaultHintConfig} from './ModalConfig';

type AddTestPayload = {
  data?: {
    metadata: {
      name: string;
    };
    spec: {
      content: any;
      type: any;
    };
    status: {
      // eslint-disable-next-line camelcase
      last_execution: any;
    };
  };
  error?: any;
};

const TestCreationModalContent: React.FC = () => {
  const [form] = Form.useForm();

  const {dispatch, navigate} = useContext(MainContext);
  const {analyticsTrack} = useContext(AnalyticsContext);

  const executors = useAppSelector(selectExecutors);
  const testSources = useAppSelector(selectSources);

  const [localLabels, setLocalLabels] = useState<readonly Option[]>([]);
  const [hintConfig, setHintConfig] = useState<HintProps>(defaultHintConfig);

  const [addTest, {isLoading}] = useAddTestMutation();

  useEffect(() => {
    const selectedExecutor = executors.find(executor =>
      executor.executor?.types?.includes(form.getFieldValue('testType'))
    );

    if (!selectedExecutor) {
      setHintConfig(defaultHintConfig);
      return;
    }

    if (selectedExecutor.executor?.executorType === 'container') {
      setHintConfig({
        title: 'Testing with custom executor',
        description: 'Discover all the features and examples around custom executors',
        openLink: openCustomExecutorDocumentation,
      });
    }

    if (selectedExecutor.executor?.executorType === 'job') {
      setHintConfig({
        title: `Testing with ${selectedExecutor.displayName}`,
        description: `Discover all the features and examples around testing with ${selectedExecutor.displayName} on Testkube`,
        openLink: () => window.open(selectedExecutor.executor.meta?.docsURI, '_blank'),
        selectedExecutor: selectedExecutor.executor.meta?.iconURI,
      });
    }

    form.setFieldValue('testSource', null);
  }, [form.getFieldValue('testType')]);

  const onSaveClick = async (values: any) => {
    const {testSource, testType} = values;

    const isTestSourceCustomGitDir = testSource.includes('custom-git-dir');

    if (isTestSourceCustomGitDir) {
      const isTestSourceExists = testSources.some(source => {
        return source.name === testSource.replace('$custom-git-dir-', '');
      });

      if (!isTestSourceExists) {
        notificationCall('failed', 'Provided test source does not exist');
        return;
      }
    }

    const testSourceSpecificFields = getTestSourceSpecificFields(values, isTestSourceCustomGitDir);

    const requestBody = {
      name: values.name,
      type: testType,
      content: {
        ...(testSource === 'file-uri' ? {type: 'string'} : isTestSourceCustomGitDir ? {} : {type: testSource}),
        ...testSourceSpecificFields,
      },
      labels: decomposeLabels(localLabels),
      ...(isTestSourceCustomGitDir ? {source: testSource.replace('$custom-git-dir-', '')} : {}),
    };

    return addTest(requestBody)
      .then((res: AddTestPayload) => {
        displayDefaultNotificationFlow(res, () => {
          analyticsTrack('trackEvents', {
            type: res?.data?.spec?.type,
            uiEvent: 'create-tests',
          });

          dispatch(setRedirectTarget({targetTestId: res?.data?.metadata?.name}));

          return navigate(`/tests/executions/${values.name}`);
        });
      })
      .catch(err => {
        displayDefaultErrorNotification(err);
      });
  };

  const onFinish = () => {
    const values = form.getFieldsValue(true);

    return onSaveClick(values);
  };

  return (
    <div style={{display: 'flex'}}>
      <Form
        form={form}
        layout="vertical"
        name="test-suite-creation"
        onFinish={onFinish}
        initialValues={{name: '', description: '', labels: []}}
        style={{flex: 1}}
        labelAlign="right"
      >
        <StyledFormSpace size={24} direction="vertical">
          <Text className="regular big">Test details</Text>
          <FirstStep
            onFileChange={(file: Nullable<UploadChangeParam>) => onFileChange(file, form)}
            onLabelsChange={setLocalLabels}
            executors={executors}
            testSources={testSources}
          />
          <StyledFormItem shouldUpdate>
            {({isFieldsTouched}) => (
              <Button
                htmlType="submit"
                loading={isLoading}
                data-test="add-a-new-test-create-button"
                disabled={isLoading || !isFieldsTouched()}
              >
                {isLoading ? 'Creating...' : 'Create'}
              </Button>
            )}
          </StyledFormItem>
        </StyledFormSpace>
      </Form>
      <Hint {...hintConfig} />
    </div>
  );
};

export default TestCreationModalContent;
