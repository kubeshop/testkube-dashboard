import {useContext, useMemo, useState} from 'react';

import {Form, Input, Select} from 'antd';

import {isEqual} from 'lodash';
import {Expose, Transform, Type} from 'class-transformer';
import {IsNotEmpty, Matches, MaxLength, MinLength, ValidateNested} from 'class-validator';

import {CustomSource, Source, SourceType} from '@models';
import {Option} from '@models/form';
import {type Executor} from '@models/executors';
import {k8sResourceNamePattern} from '@utils/form';

import {useAppSelector} from '@redux/hooks';
import {setRedirectTarget} from '@redux/reducers/configSlice';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {Button, Text} from '@custom-antd';

import {SourceInput, SourceTypeInput, useControlledForm} from '@atoms';
import {Hint, LabelsSelect} from '@molecules';
import {HintProps} from '@molecules/Hint/Hint';
import {decomposeLabels} from '@molecules/LabelsSelect/utils';

import {remapExecutors} from '@wizards/AddTestWizard/utils';

import {openCustomExecutorDocumentation} from '@utils/externalLinks';
import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useAddTestMutation} from '@services/tests';

import {AnalyticsContext, MainContext} from '@contexts';

import {StyledFormSpace} from './CreationModal.styled';
import {defaultHintConfig} from './ModalConfig';

type AddTestPayload = {
  data?: {
    metadata: {
      name: string;
    };
    spec: {
      content: any;
      type: any;
    };
    status: {
      // eslint-disable-next-line camelcase
      last_execution: any;
    };
  };
  error?: any;
};

class CreateTestDto {
  @Expose()
  // @ts-ignore:
  @Matches(k8sResourceNamePattern.pattern, {message: k8sResourceNamePattern.message})
  @MaxLength(63, {message: 'Max length 63 symbols'})
  @MinLength(1, {message: 'Required.'})
  name!: string;

  @Expose()
  @IsNotEmpty()
  executor?: string;

  @Expose()
  source?: CustomSource | SourceType;

  @Expose()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Source)
  content!: Source;

  @Expose()
  @Transform(({value}) => (value || []))
  labels: Option[] = [];
}

const hintConfigs: Record<string, (executor: Executor) => HintProps> = {
  container: () => ({
    title: 'Testing with custom executor',
    description: 'Discover all the features and examples around custom executors',
    openLink: openCustomExecutorDocumentation,
  }),
  job: (executor) => ({
    title: `Testing with ${executor.displayName}`,
    description: `Discover all the features and examples around testing with ${executor.displayName} on Testkube`,
    openLink: () => window.open(executor.executor.meta?.docsURI, '_blank'),
    selectedExecutor: executor.executor.meta?.iconURI,
  }),
};

const TestCreationModalContent: React.FC = () => {
  const {dispatch, navigate} = useContext(MainContext);
  const {analyticsTrack} = useContext(AnalyticsContext);

  const executors = useAppSelector(selectExecutors);
  const testSources = useAppSelector(selectSources);
  const remappedExecutors = useMemo(() => remapExecutors(executors), [executors]);

  const [dto, setDto] = useState<CreateTestDto>();
  const {form, value, errors, formProps, useChange, useSubmit} = useControlledForm(CreateTestDto, dto);
  useChange((nextValue, prevValue) => {
    if (!isEqual(nextValue.executor, prevValue.executor)) {
      setDto({...nextValue, source: undefined, content: undefined} as any);
    } else if (!isEqual(nextValue.source, prevValue.source)) {
      if (typeof nextValue.source === 'string') {
        setDto({...nextValue, content: {...nextValue.content, type: nextValue.source}});
      } else {
        setDto({...nextValue, content: nextValue.source!});
      }
    } else {
      setDto(nextValue);
    }
  });

  const selectedExecutor = useMemo(() => executors.find((x) => x.executor?.types?.includes(value.executor!)), [executors, value.executor]);
  const hintConfig = hintConfigs[selectedExecutor?.executor?.executorType!]?.(selectedExecutor!) || defaultHintConfig;

  const [addTest, {isLoading}] = useAddTestMutation();

  useSubmit(async () => {
    const requestBody = {
      name: value.name,
      type: value.executor!,
      content: value.content,
      source: (value.source as CustomSource)?.name,
      labels: decomposeLabels(value.labels),
    };

    return addTest(requestBody)
      .then((res: AddTestPayload) => {
        displayDefaultNotificationFlow(res, () => {
          analyticsTrack('trackEvents', {
            type: res?.data?.spec?.type,
            uiEvent: 'create-tests',
          });

          dispatch(setRedirectTarget({targetTestId: res?.data?.metadata?.name}));

          return navigate(`/tests/executions/${value.name}`);
        });
      })
      .catch(err => {
        displayDefaultErrorNotification(err);
      });
  });

  return (
    <div style={{display: 'flex'}}>
      <Form
        layout='vertical'
        name='test-suite-creation'
        style={{flex: 1}}
        labelAlign='right'
        {...formProps}
      >
        <StyledFormSpace size={24} direction='vertical'>
          <Text className='regular big'>Test details</Text>
          <div>
            <Form.Item label='Name' name='name' required>
              <Input placeholder='Name' />
            </Form.Item>
            <Form.Item label='Type' name='executor' required>
              <Select placeholder='Type' style={{width: '100%'}} options={remappedExecutors} showSearch />
            </Form.Item>
            {/* TODO What with situation when executor doesn't allow any type - container-executor-curl/test */}
            {selectedExecutor ? <Form.Item label='Test Source' name='source' required>
              <SourceTypeInput placeholder='Source' executor={selectedExecutor} sources={testSources} />
            </Form.Item> : null}
            {value.source ? <Form.Item noStyle name='content'>
              <SourceInput executor={selectedExecutor!} source={typeof value.source === 'string' ? undefined : value.source} />
            </Form.Item> : null}
            {value.source ? <Form.Item label='Labels' name='labels' style={{ marginTop: '24px' }}>
              <LabelsSelect menuPlacement='top' />
            </Form.Item> : null}
            <Form.Item>
              <Button
                htmlType='submit'
                loading={isLoading}
                data-test='add-a-new-test-create-button'
                disabled={isLoading || errors.length > 0 || !form.isFieldsTouched()}
              >
                {isLoading ? 'Creating...' : 'Create'}
              </Button>
            </Form.Item>
          </div>
        </StyledFormSpace>
      </Form>
      <Hint {...hintConfig} />
    </div>
  );
};

export default TestCreationModalContent;
