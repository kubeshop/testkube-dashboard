import {useContext, useEffect} from 'react';

import {Form, Input} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, updateExecutorPrivateRegistry} from '@redux/reducers/executorsSlice';

import {ConfigurationCard, notificationCall} from '@molecules';

import {required} from '@utils/form';
import {displayDefaultErrorNotification} from '@utils/notification';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {Permissions, usePermission} from '@permissions/base';

import {MainContext} from '@contexts';

export type PrivateRegistryFormFields = {
  privateRegistry: string;
};

const PrivateRegistry: React.FC = () => {
  const {executor, name} = useAppSelector(selectCurrentExecutor);
  const {imagePullSecrets} = executor;

  const {dispatch} = useContext(MainContext);
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateCustomExecutor] = useUpdateCustomExecutorMutation();

  const privateRegistry = (imagePullSecrets && imagePullSecrets.length && imagePullSecrets[0].name) || '';

  const [form] = Form.useForm<PrivateRegistryFormFields>();

  const onSubmit = (values: PrivateRegistryFormFields) => {
    updateCustomExecutor({
      executorId: name,
      body: {
        name,
        ...executor,
        imagePullSecrets: [{name: values.privateRegistry}],
      },
    })
      .then(() => {
        notificationCall('passed', 'Private registry was successfully updated.');

        dispatch(updateExecutorPrivateRegistry(values.privateRegistry));
      })
      .catch(err => {
        displayDefaultErrorNotification(err);
      });
  };

  useEffect(() => {
    form.setFieldsValue({
      privateRegistry,
    });
  }, [privateRegistry]);

  return (
    <Form
      form={form}
      name="general-settings-name-type"
      initialValues={{privateRegistry}}
      layout="vertical"
      onFinish={onSubmit}
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Private registry"
        description="In case your image is on a private registry please add the name of your credential secret."
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <Form.Item label="Secret ref name" name="privateRegistry" rules={[required]}>
          <Input placeholder="Secret ref name" />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default PrivateRegistry;
