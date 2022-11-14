import {useContext, useState} from 'react';

import {Form} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import {Option} from '@models/form';

import {useAppSelector} from '@redux/hooks';
import {setRedirectTarget} from '@redux/reducers/configSlice';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {Button, Text} from '@custom-antd';

import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import FirstStep from '@wizards/AddTestWizard/steps/FirstStep';
import {getTestSourceSpecificFields} from '@wizards/AddTestWizard/utils';

import {openCustomExecutorDocumentation} from '@utils/externalLinks';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useAddTestMutation} from '@services/tests';

import {AnalyticsContext, MainContext} from '@contexts';

import {Hint} from '@src/components/molecules';

import {StyledFormItem, StyledFormSpace} from './CreationModal.styled';

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

  const testSources = useAppSelector(selectSources);

  const [localLabels, setLocalLabels] = useState<readonly Option[]>([]);
  const [addTest, {isLoading}] = useAddTestMutation();

  const onSaveClick = async (values: any, toRun: boolean = false) => {
    const {testSource, testType} = values;

    const isTestSourceCustomGitDir = testSource.includes('custom-git-dir');

    const testSourceSpecificFields = getTestSourceSpecificFields(values, isTestSourceCustomGitDir, testSources);

    const requestBody = {
      name: values.name,
      type: testType,
      content: {
        type: testSource === 'file-uri' ? 'string' : isTestSourceCustomGitDir ? 'git-dir' : testSource,
        ...testSourceSpecificFields,
      },
      labels: decomposeLabels(localLabels),
    };

    return addTest(requestBody)
      .then((res: AddTestPayload) => {
        displayDefaultNotificationFlow(res, () => {
          analyticsTrack('trackEvents', {
            type: res?.data?.spec?.type,
            uiEvent: 'create-tests',
          });

          if (!toRun) {
            dispatch(setRedirectTarget({targetTestId: res?.data?.metadata?.name}));

            return navigate(`/tests/executions/${values.name}`);
          }
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

  const onFileChange = (file: Nullable<UploadChangeParam>) => {
    if (!file) {
      form.setFieldsValue({
        file: null,
      });

      form.validateFields(['file']);
    } else {
      const readFile = new FileReader();

      readFile.onload = e => {
        if (e && e.target) {
          const fileContent = e.target.result;

          if (fileContent) {
            form.setFieldsValue({
              file: {
                fileContent: fileContent as string,
                fileName: file.file.name,
              },
            });

            form.validateFields(['file']);
          }
        }
      };

      // @ts-ignore
      readFile.readAsText(file.file);
    }
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
          <FirstStep onFileChange={onFileChange} onLabelsChange={setLocalLabels} />
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
      <Hint
        title="Missing a test type?"
        description="Add test types through testkube executors."
        openLink={openCustomExecutorDocumentation}
      />
    </div>
  );
};

export default TestCreationModalContent;
