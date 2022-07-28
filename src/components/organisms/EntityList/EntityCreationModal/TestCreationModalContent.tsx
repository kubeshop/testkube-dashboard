import {useContext} from 'react';

import {Button, Form} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import {setRedirectTarget} from '@redux/reducers/configSlice';

import {Text} from '@custom-antd';

import FirstStepHint from '@wizards/AddTestWizard/hints/FirstStepHint';
import FirstStep from '@wizards/AddTestWizard/steps/FirstStep';
import {getTestSourceSpecificFields} from '@wizards/AddTestWizard/utils';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useAddTestMutation} from '@services/tests';

import {MainContext} from '@contexts';

import {StyledFormItem, StyledFormSpace} from './CreationModal.styled';

const TestCreationModalContent: React.FC = () => {
  const [form] = Form.useForm();

  const {dispatch, navigate} = useContext(MainContext);

  const [addTest, {isLoading}] = useAddTestMutation();

  const onSaveClick = async (values: any, toRun: boolean = false) => {
    const {testSource, testType} = values;

    const testSourceSpecificFields = getTestSourceSpecificFields(values);

    const requestBody = {
      name: values.name,
      type: testType,
      content: {
        type: testSource === 'file-uri' ? 'string' : testSource,
        ...testSourceSpecificFields,
      },
    };

    return addTest(requestBody)
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          const targetTestName = res?.data?.metadata?.name;

          if (!toRun) {
            dispatch(setRedirectTarget({targetTestId: targetTestName}));

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
        name="test-suite-creation"
        onFinish={onFinish}
        initialValues={{name: '', description: '', labels: []}}
        style={{flex: 1}}
      >
        <StyledFormSpace size={24} direction="vertical">
          <Text className="regular big">Test details</Text>
          <FirstStep onFileChange={onFileChange} />
          <StyledFormItem>
            <Button htmlType="submit" loading={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </StyledFormItem>
        </StyledFormSpace>
      </Form>
      {FirstStepHint}
    </div>
  );
};

export default TestCreationModalContent;
