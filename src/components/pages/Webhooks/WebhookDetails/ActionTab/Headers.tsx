import {FC} from 'react';

import {DeleteOutlined} from '@ant-design/icons';
import {Form, Input} from 'antd';

import {Button, FormIconWrapper, FormItem, FormRow, FullWidthSpace} from '@custom-antd';

import {notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateWebhookMutation} from '@services/webhooks';

import {useWebhooksPick} from '@store/webhooks';

import {requiredNoText} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {StyledButtonsContainer} from './Headers.styled';
import {composeHeaders, decomposeHeaders} from './utils';

type HeadersFormValues = {
  headers: {key: string; value: string}[];
};

const Headers: FC = () => {
  const {current} = useWebhooksPick('current');
  const mayEdit = usePermission(Permissions.editEntity);
  const [form] = Form.useForm<HeadersFormValues>();

  const [updateWebhook] = useUpdateWebhookMutation();

  const onFinish = () => {
    const values = form.getFieldsValue();
    return updateWebhook({...current!, headers: composeHeaders(values.headers)})
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'The URI was successfully updated.'));
  };

  return (
    <CardForm
      name="webhook-headers"
      title="Headers"
      description="Customize the headers we will send with each request."
      form={form}
      initialValues={{headers: decomposeHeaders(current!.headers ?? {})}}
      disabled={!mayEdit}
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
    </CardForm>
  );
};

export default Headers;
