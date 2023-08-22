import {FC, useContext, useEffect} from 'react';

import {DeleteOutlined} from '@ant-design/icons';
import {Form, Input} from 'antd';

import {Button, FormIconWrapper, FormItem, FormRow, FullWidthSpace} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {useUpdateWebhookMutation} from '@services/webhooks';

import {requiredNoText} from '@utils/form';

import WebhookDetailsContext from '../WebhookDetailsContext';

import {StyledButtonsContainer} from './Headers.styled';
import {composeHeaders, decomposeHeaders} from './utils';

type HeadersFormValues = {
  headers: {key: string; value: string}[];
};

const Headers: FC = () => {
  const [form] = Form.useForm<HeadersFormValues>();

  const {webhookDetails, setWebhookDetails} = useContext(WebhookDetailsContext);

  const [updateWebhook] = useUpdateWebhookMutation();

  const onFinish = () => {
    const values: HeadersFormValues = form.getFieldsValue();

    const newWebhook = {
      ...webhookDetails!,
      headers: composeHeaders(values.headers),
    };

    updateWebhook(newWebhook).then(() => {
      notificationCall('passed', 'The URI was successfully updated.');
      setWebhookDetails(newWebhook);
      form.resetFields();
    });
  };

  useEffect(() => {
    form.setFieldValue('headers', decomposeHeaders(webhookDetails?.headers || {}));
  }, [webhookDetails]);

  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{
        headers: decomposeHeaders(webhookDetails?.headers ?? {}),
      }}
    >
      <ConfigurationCard
        title="Headers"
        description="Customize the headers we will send with each request."
        onCancel={form.resetFields}
        onConfirm={onFinish}
      >
        <Form.List name="headers">
          {(fields, {add, remove}) => (
            <FullWidthSpace size={20} direction="vertical">
              {fields && fields.length
                ? fields.map(({key, name, ...restField}) => {
                    return (
                      <FormRow key={key}>
                        <FormItem {...restField} name={[name, 'key']} rules={[requiredNoText]}>
                          <Input placeholder="Key" />
                        </FormItem>
                        <FormItem {...restField} name={[name, 'value']} rules={[requiredNoText]}>
                          <Input placeholder="Value" />
                        </FormItem>
                        <FormIconWrapper>
                          <DeleteOutlined onClick={() => remove(name)} style={{fontSize: 21}} />
                        </FormIconWrapper>
                      </FormRow>
                    );
                  })
                : null}
              <StyledButtonsContainer>
                <Button $customType="secondary" onClick={() => add({})}>
                  Add a new variable
                </Button>
              </StyledButtonsContainer>
            </FullWidthSpace>
          )}
        </Form.List>
      </ConfigurationCard>
    </Form>
  );
};

export default Headers;
