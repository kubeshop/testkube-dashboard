import {useContext, useEffect} from 'react';

import {Form} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource, setCurrentSource} from '@redux/reducers/sourcesSlice';

import {Input} from '@custom-antd';

import {ConfigurationCard, notificationCall} from '@molecules';

import {required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateSourceMutation} from '@services/sources';

import {Permissions, usePermission} from '@permissions/base';

import {MainContext} from '@contexts';

type NameNUrlFormValues = {
  name: string;
  uri: string;
};

const NameNUrl: React.FC = () => {
  const source = useAppSelector(selectCurrentSource);
  const {dispatch} = useContext(MainContext);
  const mayEdit = usePermission(Permissions.editEntity);
  const [form] = Form.useForm<NameNUrlFormValues>();

  const [updateSource] = useUpdateSourceMutation();

  const name = source?.name;
  const uri = source?.repository?.uri;
  const defaults = {name, uri};

  useEffect(() => {
    form.setFieldsValue(defaults);
    form.resetFields();
  }, [name, uri]);

  const onFinish = (values: NameNUrlFormValues) => {
    if (!source) {
      notificationCall('failed', 'Something went wrong.');
      return;
    }

    const body = {
      ...source,
      name: values.name,
      repository: {
        ...source.repository,
        uri: values.uri,
      },
    };

    updateSource(body).then(res => {
      displayDefaultNotificationFlow(res, () => {
        notificationCall('passed', 'Source was successfully updated.');
        dispatch(setCurrentSource(body));
      });
    });
  };

  return (
    <Form
      form={form}
      name="general-settings-name-url"
      initialValues={defaults}
      layout="vertical"
      onFinish={onFinish}
      disabled={!mayEdit}
    >
      <ConfigurationCard
        title="Source name & repository URL"
        description="Define the name and repository URL of the source which will be later available in your tests."
        onConfirm={() => {
          form.submit();
        }}
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
