import {useContext, useEffect} from 'react';

import {Form, Input} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, updateCurrentExecutorData} from '@redux/reducers/executorsSlice';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultNotificationFlow} from '@utils/notification';

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

  const onSubmit = () => {
    const values = form.getFieldsValue();
    const newImagePullSecrets = values.privateRegistry ? [{name: values.privateRegistry}] : [];

    return updateCustomExecutor({
      executorId: name,
      body: {
        name,
        ...executor,
        imagePullSecrets: newImagePullSecrets,
      },
    }).then(res => {
      return displayDefaultNotificationFlow(res, () => {
        dispatch(updateCurrentExecutorData({imagePullSecrets: newImagePullSecrets}));
        notificationCall('passed', 'Private registry was successfully updated.');
      });
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
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Private registry"
        description="In case your image is on a private registry please add the name of your credential secret."
        onConfirm={onSubmit}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <Form.Item label="Secret ref name" name="privateRegistry" style={{flex: 1, marginBottom: '0'}}>
          <Input placeholder="Secret ref name" />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default PrivateRegistry;
