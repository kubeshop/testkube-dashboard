import {useContext, useEffect, useMemo, useState} from 'react';

import {Form} from 'antd';

import {SourceWithString} from '@models/sources';

import {useAppSelector} from '@redux/hooks';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {Text} from '@custom-antd';

import {ConfigurationCard, SourcesFormList, notificationCall} from '@molecules';

import {PageBlueprint} from '@organisms';

import usePressEnter from '@hooks/usePressEnter';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {SourceFormField, useAddSourcesMutation} from '@services/sources';

import {MainContext} from '@contexts';

export type SourcesFormFields = {
  sourcesFormList: SourceWithString[];
};

const Sources: React.FC = () => {
  const sourcesList = useAppSelector(selectSources);

  const [isInitialState, setIsInitialState] = useState(true);

  const {refetchSources} = useContext(MainContext);

  const [addSources] = useAddSourcesMutation();

  const onEvent = usePressEnter();

  const [form] = Form.useForm<SourcesFormFields>();

  const initialValues: SourceWithString[] = useMemo(() => {
    return sourcesList.map(sourceItem => {
      const {name, repository} = sourceItem;

      return {
        name,
        username: repository.usernameSecret?.name,
        token: repository.tokenSecret?.name,
        uri: repository.uri,
      };
    });
  }, [sourcesList]);

  const onSaveForm = (value: SourcesFormFields) => {
    const {sourcesFormList} = value;

    const adjustedPayload: SourceFormField[] = sourcesFormList.map(sourceItem => {
      const {name, token, uri, username} = sourceItem;

      return {
        name,
        type: 'git-dir',
        repository: {
          type: 'git',
          uri,
          ...(username ? {usernameSecret: {name: username}} : {}),
          ...(token ? {tokenSecret: {name: token}} : {}),
        },
      };
    });

    addSources({batch: adjustedPayload}).then((res: any) => {
      if (res.error) {
        displayDefaultNotificationFlow(res);
      } else {
        notificationCall('passed', 'Test Sources were updated successfully');
        refetchSources();
      }
    });
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
    <div
      onKeyDown={event => {
        if (!isInitialState) {
          onEvent(event, () => {
            form.submit();
          });
        }
      }}
    >
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
    </div>
  );
};

export default Sources;
