import {useContext} from 'react';

import {Input as AntdInput, Form} from 'antd';

import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';

import {RepositoryTypeEnum} from '@models/repository';

import {useAppSelector} from '@redux/hooks';
import {selectNamespace} from '@redux/reducers/configSlice';

import {Button, Input} from '@custom-antd';

import {Hint} from '@molecules';

import {openSourcesDocumentation} from '@utils/externalLinks';
import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {useCreateSourceMutation} from '@services/sources';

import {MainContext} from '@contexts';

import {AddSourceModalContainer} from './SourcesList.styled';

const AddSourceModal = () => {
  const {navigate} = useContext(MainContext);

  const [createSource, {isLoading}] = useCreateSourceMutation();

  const namespace = useAppSelector(selectNamespace);

  const onFinish = (values: any) => {
    const {name, uri, token, username} = values;

    const body = {
      name,
      repository: {
        type: 'git' as RepositoryTypeEnum,
        uri,
        ...(username ? {usernameSecret: {name: username}} : {}),
        ...(token ? {tokenSecret: {name: token}} : {}),
      },
      namespace,
    };

    createSource(body).then((res: any) => {
      displayDefaultNotificationFlow(res, () => {
        navigate(`/sources/${res.data.metadata.name}`);
      });
    });
  };

  return (
    <AddSourceModalContainer>
      <Form style={{flex: 1}} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          required
          name="name"
          rules={[required, k8sResourceNameMaxLength, k8sResourceNamePattern]}
        >
          <Input placeholder="e.g.: my-git-test-repository" />
        </Form.Item>
        <Form.Item label="Git repository URL" required name="uri" rules={[required]}>
          <Input placeholder="e.g.: https://github.com/myCompany/myRepo.git" />
        </Form.Item>
        <Form.Item label="Git username" name="username">
          <Input placeholder="e.g.: my-user-name" />
        </Form.Item>
        <Form.Item label="Git token" name="token">
          <AntdInput.Password
            placeholder="e.g.: some-token"
            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
          />
        </Form.Item>
        <Form.Item
          style={{
            textAlign: 'end',
            marginBottom: 0,
          }}
          shouldUpdate
        >
          {({isFieldsTouched}) => (
            <Button htmlType="submit" $customType="primary" loading={isLoading} disabled={!isFieldsTouched()}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          )}
        </Form.Item>
      </Form>
      <Hint
        title="Need help?"
        description="We’ll guide you to easily create your very specific test source."
        openLink={openSourcesDocumentation}
      />
    </AddSourceModalContainer>
  );
};

export default AddSourceModal;
