import {memo, useContext, useEffect, useMemo, useRef, useState} from 'react';

import {Select} from 'antd';

import {ClockCircleOutlined} from '@ant-design/icons';

import {nanoid} from '@reduxjs/toolkit';

import {Test, TestWithExecution} from '@models/test';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {ExecutorIcon, ExternalLink} from '@atoms';

import {Text, Title} from '@custom-antd';

import {ConfigurationCard, DragNDropList, notificationCall, TestSuiteStepCard} from '@molecules';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {useGetTestsListForTestSuiteQuery, useUpdateTestSuiteMutation} from '@services/testSuites';
import {useGetAllTestsQuery} from '@services/tests';

import {Permissions, usePermission} from '@permissions/base';

import {EntityDetailsContext, MainContext} from '@contexts';

import DelayModal from './DelayModal';
import {EmptyTestsContainer, StyledOptionWrapper, StyledStepsList} from './SettingsTests.styled';

const {Option} = Select;

const SettingsTests = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {entityDetails} = useContext(EntityDetailsContext);
  const mayEdit = !usePermission(Permissions.editEntity);

  const [isDelayModalVisible, setIsDelayModalVisible] = useState(false);

  const scrollRef = useRef(null);

  const executors = useAppSelector(selectExecutors);

  const {data: testsList = []} = useGetTestsListForTestSuiteQuery(entityDetails.name, {skip: !isClusterAvailable});
  const {data: allTestsList = []} = useGetAllTestsQuery(null, {skip: !isClusterAvailable});
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const testsData = useMemo<any[]>(() => {
    return testsList.map((item: Test) => ({
      name: item.name,
      namespace: item.namespace,
      type: getTestExecutorIcon(executors, item.type),
    }));
  }, [testsList]);

  const allTestsData = useMemo(() => {
    return allTestsList.map((item: TestWithExecution) => ({
      name: item.test.name,
      namespace: item.test.namespace,
      type: getTestExecutorIcon(executors, item.test.type),
    }));
  }, [allTestsList]);

  const initialSteps = useMemo(
    () =>
      (entityDetails?.steps || []).map((step: any) => {
        if (step.delay) {
          return {
            ...step,
            id: nanoid(),
          };
        }
        return {
          ...step,
          id: nanoid(),
          execute: {
            ...step.execute,
            type: testsData.find(item => item.name === step.execute.name)?.type,
          },
        };
      }),
    [entityDetails?.steps, testsData]
  );

  const [currentSteps = initialSteps, setCurrentSteps] = useState<any[] | undefined>();
  const wasTouched = currentSteps !== initialSteps;

  useEffect(() => {
    if (currentSteps !== initialSteps) {
      setCurrentSteps(undefined);
    }
  }, [initialSteps]);

  const saveSteps = () => {
    updateTestSuite({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        steps: currentSteps,
      },
    }).then((res: any) => {
      displayDefaultNotificationFlow(res, () => {
        notificationCall('passed', `Steps were successfully updated.`);
      });
    });
  };

  const onSelectStep = (value: string) => {
    if (value === 'delay') {
      setIsDelayModalVisible(true);
    } else {
      const {name, namespace, type} = JSON.parse(value);

      setCurrentSteps([
        ...currentSteps,
        {
          execute: {
            name,
            type,
            namespace,
          },
          id: nanoid(),
          stopTestOnFailure: false,
        },
      ]);
    }
  };

  const addDelay = (value?: number) => {
    setCurrentSteps([
      ...currentSteps,
      {
        delay: {
          duration: value,
        },
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

  return (
    <ConfigurationCard
      title="Tests"
      description="Define the tests and their order of execution for this test suite"
      footerText={
        <>
          Learn more about{' '}
          <ExternalLink href="https://kubeshop.github.io/testkube/using-testkube/test-suites/testsuites-creating/">
            Tests in a test suite
          </ExternalLink>
        </>
      }
      onConfirm={saveSteps}
      onCancel={() => setCurrentSteps(undefined)}
      isButtonsDisabled={!wasTouched}
      isEditable={mayEdit}
      enabled={mayEdit}
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
          items={currentSteps}
          setItems={setCurrentSteps}
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
            style={{width: '100%', marginBottom: '30px'}}
            value={null}
            showSearch
            size="large"
          >
            <Option value="delay">
              <StyledOptionWrapper>
                <ClockCircleOutlined />
                <Text className="regular middle">Delay</Text>
              </StyledOptionWrapper>
            </Option>
            {allTestsData.map((item: any) => (
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
  );
};

export default memo(SettingsTests);
