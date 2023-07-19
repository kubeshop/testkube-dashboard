import React, {useMemo, useState} from 'react';

import {Select} from 'antd';

import {ExecutorIcon} from '@atoms';

import {Button, Modal, Text} from '@custom-antd';

import usePressEnter from '@hooks/usePressEnter';

import {TestSuiteStepTest} from '@models/test';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {useGetAllTestsQuery} from '@services/tests';

import {StyledDelayModalContent, StyledOptionWrapper} from '../SettingsTests.styled';

type TestModalProps = {
  isTestModalVisible: boolean;
  setIsTestModalVisible: (flag: boolean) => void;
  addTest: (test: {name: string; type: string}) => void;
};
const {Option} = Select;

const TestModal: React.FC<TestModalProps> = props => {
  const {isTestModalVisible, setIsTestModalVisible, addTest} = props;

  const {data: allTestsList} = useGetAllTestsQuery();

  const executors = useAppSelector(selectExecutors);

  const [testValue, setTestValue] = useState<string | null>(null);

  const onEvent = usePressEnter();

  const onConfirm = () => {
    addTest(JSON.parse(testValue!));

    setTestValue(null);
    setIsTestModalVisible(false);
  };

  const allTestsData: TestSuiteStepTest[] = useMemo(() => {
    return (allTestsList || []).map(item => ({
      name: item.test.name,
      namespace: item.test.namespace,
      type: getTestExecutorIcon(executors, item.test.type),
    }));
  }, [allTestsList]);

  return (
    <Modal
      setIsModalVisible={setIsTestModalVisible}
      isModalVisible={isTestModalVisible}
      width={528}
      title="Add a Test"
      footer={
        <>
          <Button
            $customType="secondary"
            onClick={() => {
              setIsTestModalVisible(false);
              setTestValue(null);
            }}
          >
            Cancel
          </Button>
          <Button $customType="primary" onClick={onConfirm}>
            Add Test
          </Button>
        </>
      }
      content={
        <StyledDelayModalContent
          onKeyPress={event => {
            onEvent(event, onConfirm);
          }}
        >
          <Select onChange={setTestValue} value={testValue} showSearch placeholder="Select a test..." size="middle">
            {allTestsData.map(item => (
              <Option value={JSON.stringify(item)} key={item.name}>
                <StyledOptionWrapper>
                  <ExecutorIcon type={item.type} />
                  <Text className="regular middle">{item.name}</Text>
                </StyledOptionWrapper>
              </Option>
            ))}
          </Select>
        </StyledDelayModalContent>
      }
    />
  );
};

export default TestModal;
