import {useEffect, useState} from 'react';

import {Form} from 'antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {useModal} from '@modal/hooks';

import {MetadataResponse, RTKResponse} from '@models/fetch';
import {Test} from '@models/test';

import {Hint} from '@molecules';
import {HintProps} from '@molecules/Hint/Hint';

import {useExecutorsPick} from '@store/executors';
import {useSourcesPick} from '@store/sources';

import {useTelemetry} from '@telemetry/hooks';

import {externalLinks} from '@utils/externalLinks';
import {displayDefaultNotificationFlow} from '@utils/notification';

import {TestCreationModalWrapper} from './CreationModal.styled';
import TestCreationForm from './TestCreationForm';

const defaultHintConfig = {
  title: 'Missing a test type?',
  description: 'Add test types through testkube executors.',
  openLink: () => window.open(externalLinks.containerExecutor),
};

const TestCreationModalContent: React.FC = () => {
  const [form] = Form.useForm();
  const testType = Form.useWatch('testType', form);

  const {close} = useModal();
  const telemetry = useTelemetry();
  const openDetails = useDashboardNavigate((name: string) => `/tests/${name}`);

  const {executors = []} = useExecutorsPick('executors');
  const {sources} = useSourcesPick('sources');

  const [hintConfig, setHintConfig] = useState<HintProps>(defaultHintConfig);

  useEffect(() => {
    const selectedExecutor = executors.find(executor => executor.executor?.types?.includes(testType));

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
  }, [testType]);

  const onSuccess = (res: RTKResponse<MetadataResponse<Test>>) => {
    return Promise.resolve(res)
      .then(displayDefaultNotificationFlow)
      .then(({data}) => {
        telemetry.event('createTest', {type: data.spec?.type});

        openDetails(data.metadata.name);
        close();
      });
  };

  return (
    <TestCreationModalWrapper>
      <TestCreationForm form={form} testSources={sources || []} executors={executors} onSuccess={onSuccess} />
      <Hint {...hintConfig} />
    </TestCreationModalWrapper>
  );
};

export default TestCreationModalContent;
