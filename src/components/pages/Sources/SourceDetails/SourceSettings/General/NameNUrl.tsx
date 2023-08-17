import {useEffect} from 'react';

import {Form} from 'antd';

import {Input} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useUpdateSourceMutation} from '@services/sources';

import {useSourcesPick} from '@store/sources';

import {required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

type NameNUrlFormValues = {
  name: string;
  uri: string;
};

const NameNUrl: React.FC = () => {
  const {current} = useSourcesPick('current');

  const mayEdit = usePermission(Permissions.editEntity);

  const [form] = Form.useForm<NameNUrlFormValues>();

  const [updateSource] = useUpdateSourceMutation();

  const name = current!.name;
  const uri = current!.repository?.uri;
  const defaults = {name, uri};

  useEffect(() => {
    form.setFieldsValue(defaults);
    form.resetFields();
  }, [name, uri]);

  const onFinish = () => {
    const values = form.getFieldsValue();

    if (!current) {
      notificationCall('failed', 'Something went wrong.');
      return;
    }

    const body = {
      ...current,
      name: values.name,
      repository: {
        ...current.repository,
        uri: values.uri,
      },
    };

    return updateSource(body)
      .then(displayDefaultNotificationFlow)
      .then(() => notificationCall('passed', 'Source was successfully updated.'));
  };

  return (
    <Form form={form} name="general-settings-name-url" initialValues={defaults} layout="vertical" disabled={!mayEdit}>
      <ConfigurationCard
        title="Source name & repository URL"
        description="Define the name and repository URL of the source which will be later available in your tests."
        onConfirm={onFinish}
        onCancel={() => {
          form.resetFields();
        }}
        enabled={mayEdit}
      >
        <Form.Item label="Name" required name="name" rules={[required]}>
          <Input placeholder="e.g.: my-git-test-repository" disabled />
        </Form.Item>
        <Form.Item label="Git repository URL" required name="uri" rules={[required]} style={{flex: 1, marginBottom: 0}}>
          <Input placeholder="e.g.: https://github.com/myCompany/myRepo.git" />
        </Form.Item>
      </ConfigurationCard>
    </Form>
  );
};

export default NameNUrl;
