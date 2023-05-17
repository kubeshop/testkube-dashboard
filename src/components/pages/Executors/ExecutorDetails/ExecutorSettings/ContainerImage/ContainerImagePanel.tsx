import {useContext, useEffect} from 'react';

import {Form, Input} from 'antd';

import {Executor} from '@models/executors';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor, updateCurrentExecutorData} from '@redux/reducers/executorsSlice';

import {ConfigurationCard, notificationCall} from '@molecules';

import {required} from '@utils/form';
import {defaultNotificationFlow} from '@utils/notification';

import {useUpdateCustomExecutorMutation} from '@services/executors';

import {Permissions, usePermission} from '@permissions/base';

import {MainContext} from '@contexts';

export type ContainerImageFormFields = {
  image: Executor['executor']['image'];
};

const ContainerImagePanel: React.FC = () => {
  const {executor, name} = useAppSelector(selectCurrentExecutor);
  const image = executor?.image;

  const {dispatch} = useContext(MainContext);
  const mayEdit = usePermission(Permissions.editEntity);

  const [updateCustomExecutor] = useUpdateCustomExecutorMutation();

  const [form] = Form.useForm<ContainerImageFormFields>();

  const onSubmit = () => {
    const values = form.getFieldsValue();

    return updateCustomExecutor({
      executorId: name,
      body: {
        name,
        ...executor,
        ...values,
      },
    }).then(res => {
      return defaultNotificationFlow(res, () => {
        notificationCall('passed', 'Container image was successfully updated.');
        dispatch(updateCurrentExecutorData({image: values.image}));
      });
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      image,
    });
  }, [image]);

  return (
    <Form form={form} name="general-settings-name-type" initialValues={{image}} layout="vertical" disabled={!mayEdit}>
      <ConfigurationCard
        title="Container image"
        description="Define the image you want to use for this executor. We defer by default to Dockerhub - but you can also insert a URL to your very own image"
        onConfirm={onSubmit}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <Form.Item
          label="Container image"
          required
          name="image"
          rules={[required]}
          style={{flex: 1, marginBottom: '0'}}
        >
          <Input placeholder="Container image" />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default ContainerImagePanel;
