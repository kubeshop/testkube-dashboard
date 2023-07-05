import {memo, useContext, useEffect, useMemo, useRef, useState} from 'react';

import {ClockCircleOutlined, WarningOutlined} from '@ant-design/icons';
import {Button, Form, Select} from 'antd';

import {nanoid} from '@reduxjs/toolkit';

import {ExecutorIcon, ExternalLink} from '@atoms';

import {EntityDetailsContext, MainContext} from '@contexts';

import {Text, Title} from '@custom-antd';

import {TestSuiteStepTest} from '@models/test';
import {TestSuite, TestSuiteStep} from '@models/testSuite';

import {ConfigurationCard, DragNDropList, TestSuiteStepCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {useGetTestsListForTestSuiteQuery, useUpdateTestSuiteMutation} from '@services/testSuites';
import {useGetAllTestsQuery} from '@services/tests';

import {externalLinks} from '@utils/externalLinks';
import {displayDefaultNotificationFlow} from '@utils/notification';

import DelayModal from './DelayModal';
import {EmptyTestsContainer, StyledOptionWrapper, StyledStepsList} from './SettingsTests.styled';

const {Option} = Select;

interface LocalStep extends TestSuiteStep {
  type?: string;
  stopTestOnFailure?: boolean;
  id?: string;
}

const SettingsTests: React.FC<{openDefinition(): void}> = ({openDefinition}) => {
  const {isClusterAvailable} = useContext(MainContext);
  const {entityDetails} = useContext(EntityDetailsContext) as {entityDetails: TestSuite};

  const mayEdit = usePermission(Permissions.editEntity);

  const [isDelayModalVisible, setIsDelayModalVisible] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const executors = useAppSelector(selectExecutors);

  const {data: testsList} = useGetTestsListForTestSuiteQuery(entityDetails.name, {
    skip: !isClusterAvailable || !entityDetails.name,
  });
  const {data: allTestsList} = useGetAllTestsQuery(null, {skip: !isClusterAvailable});
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const testsData: TestSuiteStepTest[] = useMemo(() => {
    return (testsList || []).map(item => ({
      name: item.name,
      namespace: item.namespace,
      type: getTestExecutorIcon(executors, item.type),
    }));
  }, [testsList]);

  const allTestsData: TestSuiteStepTest[] = useMemo(() => {
    return (allTestsList || []).map(item => ({
      name: item.test.name,
      namespace: item.test.namespace,
      type: getTestExecutorIcon(executors, item.test.type),
    }));
  }, [allTestsList]);

  const hasParallelSteps = useMemo(
    () => entityDetails?.steps?.some(step => step.execute.length > 0),
    [entityDetails.steps]
  );

  const initialSteps: LocalStep[] = useMemo(
    () =>
      entityDetails.steps
        ? entityDetails.steps.map(step => {
            const id = nanoid();

            const firstItemInStep = step.execute[0];

            if ('delay' in firstItemInStep) {
              return {
                ...firstItemInStep,
                id,
              };
            }

            return {
              ...firstItemInStep,
              id,
              type: testsData.find(item => item.name === firstItemInStep.test)?.type || '',
              stopTestOnFailure: step.stopTestOnFailure,
            };
          })
        : [],
    [entityDetails?.steps, testsData]
  );

  const [currentSteps = initialSteps, setCurrentSteps] = useState<LocalStep[]>([]);

  const wasTouched = currentSteps !== initialSteps;

  useEffect(() => {
    if (currentSteps !== initialSteps) {
      setCurrentSteps(initialSteps);
    }
  }, [initialSteps]);

  const saveSteps = () => {
    return updateTestSuite({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        steps: currentSteps.map(step => {
          return {
            stopTestOnFailure: step.stopTestOnFailure,
            execute: [{...(step.test ? {test: step.test} : {delay: step.delay})}],
          };
        }),
      },
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        notificationCall('passed', 'Steps were successfully updated.');
      });
  };

  const onSelectStep = (value: string) => {
    if (value === 'delay') {
      setIsDelayModalVisible(true);
    } else {
      const {name, type} = JSON.parse(value);

      setCurrentSteps([
        ...currentSteps,
        {
          test: name,
          id: nanoid(),
          type,
          stopTestOnFailure: false,
        },
      ]);
    }
  };

  const addDelay = (value: number) => {
    setCurrentSteps([
      ...currentSteps,
      {
        delay: `${value}ms`,
        id: nanoid(),
        stopTestOnFailure: false,
      },
    ]);
    setIsDelayModalVisible(false);
  };

  const deleteStep = (index: number) => {
    setCurrentSteps([...currentSteps.slice(0, index), ...currentSteps.slice(index + 1)]);
  };

  const scrollToBottom = () => {
    if (!scrollRef.current) {
      return;
    }

    // @ts-ignore
    scrollRef.current.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSteps?.length]);

  // TODO: Delete when we will support parallel editor
  if (hasParallelSteps) {
    return (
      <Form name="define-tests-form">
        <ConfigurationCard
          title="Tests"
          description="Define the tests and their order of execution for this test suite"
          footerText={
            <>
              Learn more about{' '}
              <ExternalLink href={externalLinks.testSuitesCreating}>Tests in a test suite</ExternalLink>
            </>
          }
        >
          <EmptyTestsContainer>
            <Title level={3} className="text-center">
              <WarningOutlined /> This test suite is using parallel execution.
            </Title>
            <Text className="regular middle text-center" style={{maxWidth: 600}}>
              Unfortunately, we do not support visual editor for it yet.
            </Text>
            <Text className="regular middle text-center" style={{maxWidth: 600}}>
              We are working hard to deliver it for you soon. Until then, you may use{' '}
              <strong>
                <em>Definition</em>
              </strong>{' '}
              tab, to modify the test suite definition using YAML.
            </Text>
            <Button style={{marginTop: 15}} type="primary" onClick={openDefinition}>
              Edit YAML definition
            </Button>
          </EmptyTestsContainer>
        </ConfigurationCard>
      </Form>
    );
  }

  return (
    <Form name="define-tests-form">
      <ConfigurationCard
        title="Tests"
        description="Define the tests and their order of execution for this test suite"
        footerText={
          <>
            Learn more about <ExternalLink href={externalLinks.testSuitesCreating}>Tests in a test suite</ExternalLink>
          </>
        }
        onConfirm={saveSteps}
        onCancel={() => setCurrentSteps([])}
        isButtonsDisabled={!wasTouched}
        isEditable={mayEdit}
        enabled={mayEdit}
        forceEnableButtons={wasTouched}
      >
        <>
          {currentSteps?.length === 0 ? (
            <EmptyTestsContainer>
              <Title level={2} className="text-center">
                Add your tests to this test suite
              </Title>
              <Text className="regular middle text-center">
                Select tests from the dropdown below to add them to this suite
              </Text>
            </EmptyTestsContainer>
          ) : null}
          <DragNDropList
            value={currentSteps}
            onChange={setCurrentSteps}
            onDelete={deleteStep}
            scrollRef={scrollRef}
            ContainerComponent={StyledStepsList}
            ItemComponent={TestSuiteStepCard}
            disabled={!mayEdit}
          />
          <DelayModal
            isDelayModalVisible={isDelayModalVisible}
            setIsDelayModalVisible={setIsDelayModalVisible}
            addDelay={addDelay}
          />
          {mayEdit ? (
            <Select
              placeholder="Add a test or delay"
              showArrow
              onChange={onSelectStep}
              style={{width: '100%', marginTop: 15, marginBottom: 30}}
              value={null}
              showSearch
              size="middle"
            >
              <Option value="delay">
                <StyledOptionWrapper>
                  <ClockCircleOutlined />
                  <Text className="regular middle">Delay</Text>
                </StyledOptionWrapper>
              </Option>
              {allTestsData.map(item => (
                <Option value={JSON.stringify(item)} key={item.name}>
                  <StyledOptionWrapper>
                    <ExecutorIcon type={item.type} />
                    <Text className="regular middle">{item.name}</Text>
                  </StyledOptionWrapper>
                </Option>
              ))}
            </Select>
          ) : null}
        </>
      </ConfigurationCard>
    </Form>
  );
};

export default memo(SettingsTests);
