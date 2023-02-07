import {memo, useContext, useEffect, useMemo, useRef, useState} from 'react';

import {Select} from 'antd';

import {ClockCircleOutlined} from '@ant-design/icons';

import {nanoid} from '@reduxjs/toolkit';

import {TestWithExecution} from '@models/test';
import {TestExecutor} from '@models/testExecutors';

import {TestRunnerIcon} from '@atoms';

import {Text, Title} from '@custom-antd';

import {ConfigurationCard, DragNDropList, TestSuiteStepCard, notificationCall} from '@molecules';

import {displayDefaultErrorNotification, displayDefaultNotificationFlow} from '@utils/notification';

import {useUpdateTestSuiteMutation} from '@services/testSuites';
import {useGetAllTestsQuery} from '@services/tests';

import {EntityDetailsContext} from '@contexts';

import DelayModal from './DelayModal';
import {EmptyTestsContainer, StyledOptionWrapper, StyledStepsList} from './SettingsTests.styled';

const {Option} = Select;

const SettingsTests = () => {
  const {entityDetails} = useContext(EntityDetailsContext);
  const steps = entityDetails?.steps;

  const [currentSteps, setCurrentSteps] = useState(steps);
  const [isDelayModalVisible, setIsDelayModalVisible] = useState(false);
  const [wasTouched, setWasTouched] = useState(false);

  const scrollRef = useRef(null);

  const {data: testsList = []} = useGetAllTestsQuery();
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const testsData = useMemo(() => {
    return testsList.map((item: TestWithExecution) => ({
      name: item.test.name,
      namespace: item.test.namespace,
      type: item.test.type,
    }));
  }, [testsList]);

  const saveSteps = () => {
    updateTestSuite({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        steps: currentSteps,
      },
    })
      .then((res: any) => {
        displayDefaultNotificationFlow(res, () => {
          notificationCall('passed', `Steps were successfully updated.`);
        });
      })
      .catch((err: any) => displayDefaultErrorNotification(err));
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
      setWasTouched(true);
      scrollToBottom();
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
    setWasTouched(true);
    scrollToBottom();
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

  const applyCurrentSteps = (_steps: any[], _testsData: any[]) => {
    setCurrentSteps(
      _steps.map((step: any) => {
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
            type: _testsData.find(item => item.name === step.execute.name)?.type,
          },
        };
      })
    );
  };

  useEffect(() => {
    if (!steps) {
      setCurrentSteps([]);
    } else {
      applyCurrentSteps(steps, testsData);
    }
  }, [steps, testsData]);

  return (
    <ConfigurationCard
      title="Tests"
      description="Define the tests and their order of execution for this test suite"
      footerText={
        <>
          Learn more about{' '}
          <a href="https://kubeshop.github.io/testkube/using-testkube/test-suites/testsuites-creating/" target="_blank">
            Tests in a test suite
          </a>
        </>
      }
      onConfirm={saveSteps}
      onCancel={() => {
        applyCurrentSteps(steps, testsData);
        setWasTouched(false);
      }}
      isButtonsDisabled={!wasTouched}
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
        />
        <DelayModal
          isDelayModalVisible={isDelayModalVisible}
          setIsDelayModalVisible={setIsDelayModalVisible}
          addDelay={addDelay}
        />
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
          {testsData.map((item: any) => (
            <Option value={JSON.stringify(item)} key={item.name}>
              <StyledOptionWrapper>
                <TestRunnerIcon icon={item.type as TestExecutor} />
                <Text className="regular middle">{item.name}</Text>
              </StyledOptionWrapper>
            </Option>
          ))}
        </Select>
      </>
    </ConfigurationCard>
  );
};

export default memo(SettingsTests);
