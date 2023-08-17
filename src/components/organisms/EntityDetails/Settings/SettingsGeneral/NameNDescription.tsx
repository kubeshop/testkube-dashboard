import {Form, Input} from 'antd';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {capitalize} from 'lodash';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useEntityDetailsPick} from '@store/entityDetails';

import {required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

const {TextArea} = Input;

type NameNDescriptionFormValues = {
  name: string;
  description: string;
};

interface NameNDescriptionProps {
  label: string;
  useUpdateEntity: UseMutation<MutationDefinition<any, any, any, any, any>>;
}

const NameNDescription: React.FC<NameNDescriptionProps> = ({label, useUpdateEntity}) => {
  const {details} = useEntityDetailsPick('details');
  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<NameNDescriptionFormValues>();

  const [updateEntity] = useUpdateEntity();

  if (!details) {
    return null;
  }

  const name = details?.name;
  const description = details?.description;

  const onSave = () => {
    const values = form.getFieldsValue();

    return updateEntity({
      id: details.name,
      data: {
        ...details,
        name: values.name,
        description: values.description,
        executionRequest: {
          description: values.description,
        },
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', `${capitalize(label)} was successfully updated.`));
  };

  return (
    <Form form={form} name="general-settings-name-description" initialValues={{name, description}} disabled={!mayEdit}>
      <ConfigurationCard
        title={`${capitalize(label)} name & description`}
        description="Define the name and description of the project which will be displayed across the Dashboard and CLI"
        onConfirm={onSave}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <FullWidthSpace size={32} direction="vertical">
          <FormItem name="name" rules={[required]}>
            <Input placeholder="Name" disabled />
          </FormItem>
          <FormItem name="description">
            <TextArea placeholder="Description" autoSize={{minRows: 2, maxRows: 3}} />
          </FormItem>
        </FullWidthSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default NameNDescription;