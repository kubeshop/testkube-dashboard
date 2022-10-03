import {useContext} from 'react';

import {Form} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import {Button, Text} from '@custom-antd';

import {getTestSourceSpecificFields} from '@wizards/AddTestWizard/utils';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestMutation} from '@services/tests';

import {MainContext,EntityDetailsContext} from '@contexts';

import UpdateStep from '@src/components/wizards/AddTestWizard/steps/UpdateStep';
import { notificationCall } from '@src/components/molecules';
import {StyledFormItem, StyledFormSpace} from './CreationModal.styled';

const TestUpdateModalContent: React.FC = () => {
  const [form] = Form.useForm();
  const {entityDetails, defaultStackRoute} = useContext(EntityDetailsContext);

  const {navigate} = useContext(MainContext);

  const [updateTest, {isLoading}] = useUpdateTestMutation();

  const onSaveClick = async (values: any, toRun: boolean = false) => {
    const {testSource, testType} = values;

    const testSourceSpecificFields = getTestSourceSpecificFields(values);
    const requestBody = {
      name: entityDetails.name,
      type: testType,
      content: {
        type: testSource === 'file-uri' ? 'string' : testSource,
        ...testSourceSpecificFields,
      },
    };
    return updateTest(requestBody)
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {

          notificationCall('passed', `Update success.`);

          navigate(defaultStackRoute);
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
        requiredMark="optional"
        labelAlign="right"
      >
        <StyledFormSpace size={24} direction="vertical">
          <Text className="regular big">Test details</Text>
          <UpdateStep onFileChange={onFileChange} />
          <StyledFormItem>
            <Button htmlType="submit" loading={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </StyledFormItem>
        </StyledFormSpace>
      </Form>
    </div>
  );
};

export default TestUpdateModalContent;
