import {memo, useContext, useEffect, useState} from 'react';

import {InputNumber, Select} from 'antd';

import {ClockCircleOutlined} from '@ant-design/icons';

import {TestWithExecution} from '@models/test';
import {TestExecutor} from '@models/testExecutors';

import {TestRunnerIcon} from '@atoms';

import {Button, Modal, Text, Title} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

// import {ReactComponent as K6Icon} from '@assets/k6Icon.svg';
import {useGetAllTestsQuery} from '@services/tests';

import {EntityExecutionsContext} from '../../../EntityExecutionsContainer/EntityExecutionsContainer';
import {EmptyTestsContainer, StyledDelayModalContent, StyledOptionWrapper} from './SettingsTests.styled';

const {Option} = Select;

const SettingsTests = () => {
  const {entityDetails} = useContext(EntityExecutionsContext);
  const {steps = []} = entityDetails;

  const [currentSteps, setCurrentSteps] = useState(steps);
  const [isDelayModalVisible, setIsDelayModalVisible] = useState(false);
  const [delayValue, setDelayValue] = useState<string | undefined>(undefined);

  const {data: testsList = []} = useGetAllTestsQuery();

  const testsData = testsList.map((item: TestWithExecution) => ({
    name: item.test.name,
    namespace: item.test.namespace,
    type: item.test.type,
  }));

  useEffect(() => {
    if (!steps) {
      setCurrentSteps([]);
    } else {
      setCurrentSteps(steps);
    }
  }, [steps]);

  const saveSteps = () => {
    console.log(currentSteps);
  };

  const onSelectStep = (value: string) => {
    if (value === 'delay') {
      setIsDelayModalVisible(true);
    } else {
      setCurrentSteps([...currentSteps, JSON.parse(value)]);
    }
  };

  console.log(currentSteps);

  return (
    <ConfigurationCard
      title="Tests"
      description="Define the tests and their order of execution for this test suite"
      footerText={
        <Text className="regular middle">
          Learn more about{' '}
          <a href="https://kubeshop.github.io/testkube/testsuites-creating/" target="_blank">
            Tests in a test suite
          </a>
        </Text>
      }
      onConfirm={saveSteps}
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
        <Select
          placeholder="Add a test or delay"
          showArrow
          onChange={onSelectStep}
          style={{width: '100%'}}
          value={null}
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
        <Modal
          setIsModalVisible={setIsDelayModalVisible}
          isModalVisible={isDelayModalVisible}
          width={528}
          title="Add a delay"
          footer={
            <>
              <Button customType="secondary" onClick={() => setIsDelayModalVisible(false)}>
                Cancel
              </Button>
              <Button
                customType="primary"
                onClick={() => {
                  setCurrentSteps([...currentSteps, {type: 'delay', name: `${delayValue}ms`}]);
                  setIsDelayModalVisible(false);
                  setDelayValue(undefined);
                }}
              >
                Add delay
              </Button>
            </>
          }
          content={
            <StyledDelayModalContent>
              <Text className="regular middle">Delay in ms</Text>
              <InputNumber
                placeholder="Delay"
                controls={false}
                value={delayValue}
                onChange={value => setDelayValue(value)}
              />
            </StyledDelayModalContent>
          }
        />
      </>
    </ConfigurationCard>
  );
};

export default memo(SettingsTests);
