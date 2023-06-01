import {useContext} from 'react';

import {Form, Input} from 'antd';

import {EntityDetailsContext} from '@contexts';

import {FormItem, FullWidthSpace} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import {namingMap, updateRequestsMap} from '../utils';

const {TextArea} = Input;

type NameNDescriptionFormValues = {
  name: string;
  description: string;
};

const NameNDescription: React.FC = () => {
  const {entity, entityDetails} = useContext(EntityDetailsContext);
  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<NameNDescriptionFormValues>();

  const [updateEntity] = updateRequestsMap[entity]();

  if (!entity || !entityDetails) {
    return null;
  }

  const name = entityDetails?.name;
  const description = entityDetails?.description;

  const onSave = () => {
    const values = form.getFieldsValue();

    return updateEntity({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        name: values.name,
        description: values.description,
        executionRequest: {
          description: values.description,
        },
      },
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => notificationCall('passed', `${uppercaseFirstSymbol(namingMap[entity])} was successfully updated.`));
  };

  return (
    <Form form={form} name="general-settings-name-description" initialValues={{name, description}} disabled={!mayEdit}>
      <ConfigurationCard
        title={`${uppercaseFirstSymbol(namingMap[entity])} name & description`}
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
