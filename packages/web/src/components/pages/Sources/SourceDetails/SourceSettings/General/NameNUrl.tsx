import {Form} from 'antd';

import {Input} from '@custom-antd';

import {notificationCall} from '@molecules';

import {CardForm} from '@organisms';

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
    <CardForm
      name="general-settings-name-url"
      title="Source name & repository URL"
      description="Define the name and repository URL of the source which will be later available in your tests."
      spacing={24}
      form={form}
      initialValues={{name: current!.name, uri: current!.repository?.uri}}
      disabled={!mayEdit}
      onConfirm={onFinish}
    >
      <Form.Item label="Name" required name="name" rules={[required]}>
        <Input placeholder="e.g.: my-git-test-repository" disabled />
      </Form.Item>
      <Form.Item label="Git repository URL" required name="uri" rules={[required]} style={{flex: 1, marginBottom: 0}}>
        <Input placeholder="e.g.: https://github.com/myCompany/myRepo.git" />
      </Form.Item>
    </CardForm>
  );
};

export default NameNUrl;
