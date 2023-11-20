import React, {useMemo, useState} from 'react';

import {Select} from 'antd';

import {ExecutorIcon} from '@atoms';

import {Button, Modal, Text} from '@custom-antd';

import usePressEnter from '@hooks/usePressEnter';

import {TestSuiteStepTest, TestWithExecution} from '@models/test';

import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {useGetAllTestsQuery} from '@services/tests';

import {useExecutorsPick} from '@store/executors';

import {StyledDelayModalContent, StyledOptionWrapper} from '../SettingsTests.styled';

type TestModalProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (test: {test: string; type: string}) => void;
};
const {Option} = Select;

const TestModal: React.FC<TestModalProps> = props => {
  const {visible, onClose, onSubmit} = props;

  const {data: allTestsList} = useGetAllTestsQuery();

  const {executors = []} = useExecutorsPick('executors');

  const [testValue, setTestValue] = useState<string | null>(null);

  const onEvent = usePressEnter();

  const onConfirm = () => {
    const testData = allTestsData.find(x => x.name === testValue!);
    if (testData) {
      onSubmit({test: testData.name, type: testData.type!});
    }

    setTestValue(null);
    onClose();
  };

  const allTestsData: TestSuiteStepTest[] = useMemo(() => {
    return (allTestsList || [])
      .filter((t: TestWithExecution) => !t.test.readOnly)
      .map(item => ({
        name: item.test.name,
        namespace: item.test.namespace,
        type: getTestExecutorIcon(executors, item.test.type),
      }));
  }, [allTestsList]);

  return (
    <Modal
      setIsModalVisible={onClose}
      isModalVisible={visible}
      width={528}
      title="Add a Test"
      footer={
        <>
          <Button
            $customType="secondary"
            onClick={() => {
              onClose();
              setTestValue(null);
            }}
          >
            Cancel
          </Button>
          <Button $customType="primary" onClick={onConfirm} disabled={!testValue}>
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
              <Option value={item.name} key={item.name} title={item.name}>
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
