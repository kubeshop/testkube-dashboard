import {useContext, useEffect, useState} from 'react';

import {Form} from 'antd';

import {MetadataResponse, RTKResponse} from '@models/fetch';
import {ErrorNotificationConfig} from '@models/notifications';
import {Test} from '@models/test';

import {useAppSelector} from '@redux/hooks';
import {setRedirectTarget} from '@redux/reducers/configSlice';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {Hint} from '@molecules';
import {HintProps} from '@molecules/Hint/Hint';

import {externalLinks} from '@utils/externalLinks';
import {defaultNotificationFlow} from '@utils/notification';

import {AnalyticsContext, DashboardContext, MainContext} from '@contexts';

import {TestCreationModalWrapper} from './CreationModal.styled';
import {defaultHintConfig} from './ModalConfig';
import TestCreationForm from './TestCreationForm';

const TestCreationModalContent: React.FC = () => {
  const [form] = Form.useForm();

  const {dispatch} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);
  const {analyticsTrack} = useContext(AnalyticsContext);

  const executors = useAppSelector(selectExecutors);
  const testSources = useAppSelector(selectSources);

  const [hintConfig, setHintConfig] = useState<HintProps>(defaultHintConfig);
  const [error, setError] = useState<ErrorNotificationConfig | undefined>(undefined);

  useEffect(() => {
    const selectedExecutor = executors.find(executor =>
      executor.executor?.types?.includes(form.getFieldValue('testType'))
    );

    if (!selectedExecutor) {
      setHintConfig(defaultHintConfig);
    } else {
      if (selectedExecutor.executor?.executorType === 'container') {
        setHintConfig({
          title: 'Testing with custom executor',
          description: 'Discover all the features and examples around custom executors',
          openLink: () => window.open(externalLinks.containerExecutor),
        });
      }

      if (selectedExecutor.executor?.executorType === 'job') {
        setHintConfig({
          title: `Testing with ${selectedExecutor.displayName}`,
          description: `Discover all the features and examples around testing with ${selectedExecutor.displayName} on Testkube`,
          openLink: () => window.open(selectedExecutor.executor?.meta?.docsURI, '_blank'),
          selectedExecutor: selectedExecutor.executor?.meta?.iconURI,
        });
      }

      form.setFieldValue('testSource', null);
    }
  }, [form.getFieldValue('testType')]);

  const onSuccess = (res: RTKResponse<MetadataResponse<Test>>) => {
    defaultNotificationFlow(
      res,
      () => {
        if ('data' in res) {
          analyticsTrack('trackEvents', {
            type: res.data.spec?.type,
            uiEvent: 'create-tests',
          });

          dispatch(setRedirectTarget({targetTestId: res.data.metadata.name}));

          navigate(`/tests/executions/${res.data.metadata.name}`);
        }
      },
      err => {
        setError(err);
      }
    );
  };

  return (
    <TestCreationModalWrapper>
      <TestCreationForm
        form={form}
        testSources={testSources}
        executors={executors}
        onSuccess={onSuccess}
        error={error}
      />
      <Hint {...hintConfig} />
    </TestCreationModalWrapper>
  );
};

export default TestCreationModalContent;
