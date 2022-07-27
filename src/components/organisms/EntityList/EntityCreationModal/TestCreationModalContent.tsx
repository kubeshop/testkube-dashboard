import {useContext} from 'react';

import {Button, Form, notification} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import {setRedirectTarget} from '@redux/reducers/configSlice';

import {Text} from '@custom-antd';

import {getTestSourceSpecificFields} from '@wizards/AddTestWizard/utils';

import {useAddTestMutation} from '@services/tests';

import {MainContext} from '@contexts';

import FirstStepHint from '@src/components/wizards/AddTestWizard/hints/FirstStepHint';
import FirstStep from '@src/components/wizards/AddTestWizard/steps/FirstStep';

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
        if (res.error) {
          const errorTitle = res.error?.data.title || 'Unknown error';
          const errorDetails = res.error?.data.detail || 'Something went wrong';
          const errorStatus = res.error?.status;

          notification.error({
            message: errorTitle,
            description: (
              <span>
                Status: {errorStatus}
                <br />
                Details: {errorDetails}
              </span>
            ),
            duration: 0,
          });
        } else {
          const targetTestName = res?.data?.metadata?.name;

          if (!toRun) {
            dispatch(setRedirectTarget({targetTestId: targetTestName}));

            return navigate(`/tests/executions/${values.name}`);
          }

          return targetTestName;
        }
      })
      .catch(err => {
        if (err instanceof Error) {
          notification.error({
            message: 'Unknown error',
            description: String(err) || 'Something went wrong',
            duration: 0,
          });
        }
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
