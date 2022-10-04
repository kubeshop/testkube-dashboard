import {useEffect, useMemo, useState} from 'react';

import {Form} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {Text} from '@custom-antd';

import {ConfigurationCard, SourcesFormList} from '@molecules';

import {PageBlueprint} from '@organisms';

const Sources: React.FC = () => {
  const sourcesList = useAppSelector(selectSources);

  const [isInitialState, setIsInitialState] = useState(true);

  const [form] = Form.useForm<{
    sourcesFormList: {
      name: string;
      username: string;
      repository: string;
      token: string;
    }[];
  }>();

  const initialValues = useMemo(() => {
    return sourcesList.map((sourceItem, index) => {
      const {name, repository} = sourceItem;

      return {
        name,
        username: '',
        token: '',
        uri: repository.uri,
      };
    });
  }, [sourcesList]);

  const onSaveForm = (value: {
    sourcesFormList: {
      name: string;
      username: string;
      repository: string;
      token: string;
    }[];
  }) => {
    const {sourcesFormList} = value;
  };

  const onChange = () => {
    if (isInitialState) {
      setIsInitialState(false);
    }
  };

  const onSave = () => {
    form.submit();
  };

  const onCancel = () => {
    form.setFieldsValue({
      sourcesFormList: initialValues,
    });

    setIsInitialState(true);
  };

  useEffect(() => {
    form.setFieldsValue({
      sourcesFormList: initialValues,
    });
  }, [initialValues]);

  return (
    <PageBlueprint
      title="Sources"
      description={
        <>
          Define global sources you can refer to in your tests. Learn more about{' '}
          <a href="https://kubeshop.github.io/testkube/openapi/#tag/test-sources" target="_blank">
            Sources
          </a>
        </>
      }
    >
      <ConfigurationCard
        title="GitHub"
        description="Testkube can connect to different GitHub projects to help you set up your tests."
        footerText={
          <Text className="regular middle">
            Learn more about{' '}
            <a href="https://kubeshop.github.io/testkube/openapi/#tag/test-sources" target="_blank">
              GitHub as a source
            </a>
          </Text>
        }
        onConfirm={onSave}
        onCancel={onCancel}
        confirmButtonText="Save"
        isButtonsDisabled={isInitialState}
      >
        <SourcesFormList form={form} initialValues={initialValues} onSaveForm={onSaveForm} onChange={onChange} />
      </ConfigurationCard>
    </PageBlueprint>
  );
};

export default Sources;
