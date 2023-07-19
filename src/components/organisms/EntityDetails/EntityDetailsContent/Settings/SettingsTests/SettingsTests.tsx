import {memo, useContext, useEffect, useMemo, useState} from 'react';

import {Form} from 'antd';

import {nanoid} from '@reduxjs/toolkit';

import {ExternalLink} from '@atoms';

import {EntityDetailsContext, MainContext} from '@contexts';

import {Button, Title} from '@custom-antd';

import useClusterVersionMatch from '@hooks/useClusterVersionMatch';

import {TestSuiteStepTest} from '@models/test';
import {LocalStep, TestSuite} from '@models/testSuite';

import {ConfigurationCard, notificationCall} from '@molecules';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {useGetTestsListForTestSuiteQuery, useUpdateTestSuiteMutation} from '@services/testSuites';

import {externalLinks} from '@utils/externalLinks';
import {displayDefaultNotificationFlow} from '@utils/notification';
import {convertTestSuiteV2ToV3, isTestSuiteV2} from '@utils/testSuites';

import DelayModal from './Modals/DelayModal';
import TestModal from './Modals/TestModal';
import {EmptyTestsContainer} from './SettingsTests.styled';
import TestSuiteStepsFlow from './TestSuiteStepsFlow';

const SettingsTests = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {entityDetails: rawEntityDetails} = useContext(EntityDetailsContext) as {entityDetails: TestSuite};

  const isV2 = useClusterVersionMatch('<1.13.0', isTestSuiteV2(rawEntityDetails));
  const entityDetails = useMemo(
    () => (isV2 ? convertTestSuiteV2ToV3(rawEntityDetails) : rawEntityDetails),
    [rawEntityDetails]
  );

  const executors = useAppSelector(selectExecutors);

  const mayEdit = usePermission(Permissions.editEntity);

  const {data: testsList} = useGetTestsListForTestSuiteQuery(entityDetails.name, {
    skip: !isClusterAvailable || !entityDetails.name,
  });
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const testsData: TestSuiteStepTest[] = useMemo(() => {
    return (testsList || []).map(item => ({
      name: item.name,
      namespace: item.namespace,
      type: getTestExecutorIcon(executors, item.type),
    }));
  }, [testsList]);

  const initialSteps: LocalStep[][] = useMemo(() => {
    if (!entityDetails.steps) {
      return [];
    }

    return entityDetails.steps.map(step => {
      return step.execute.map(item => {
        const id = nanoid();
        if ('delay' in item) {
          return {
            ...item,
            id,
          };
        }

        return {
          ...item,
          id,
          type: testsData.find(x => x.name === item.test)?.type || '',
        };
      });
    });
  }, [testsData]);

  const [isDelayModalVisible, setIsDelayModalVisible] = useState(false);
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [currentGroup, setCurrentGroup] = useState<number | string>(0);

  const [steps, setSteps] = useState(initialSteps);

  const wasTouched = steps !== initialSteps;

  useEffect(() => {
    setSteps(initialSteps);
  }, [testsData]);

  const showModal = (value: string, group: number | string) => {
    if (value === 'test') {
      setIsTestModalVisible(true);
    } else {
      setIsDelayModalVisible(true);
    }

    setCurrentGroup(group);
  };

  const addNode = (data: number | {name: string; type: string}) => {
    const item =
      typeof data === 'number' ? {id: nanoid(), delay: `${data}ms`} : {id: nanoid(), test: data.name, type: data.type};

    if (typeof currentGroup === 'number') {
      setSteps([
        ...steps.slice(0, currentGroup),
        [...(steps[currentGroup] || []), item],
        ...steps.slice(currentGroup + 1),
      ]);
    } else {
      const index = Number(currentGroup.split('-')[0]) + 1;
      setSteps([...steps.slice(0, index), [item], ...steps.slice(index)]);
    }
  };

  const onSave = () => {
    const resultSteps = steps.map((items, i) => {
      return {
        execute: items.map(item => {
          if ('delay' in item) {
            return {
              delay: item.delay,
            };
          }
          return {
            test: item.test,
          };
        }),
        stopOnFailure: Boolean(entityDetails?.steps?.[i]?.stopOnFailure),
      };
    });

    return updateTestSuite({
      id: entityDetails.name,
      data: {
        ...entityDetails,
        steps: resultSteps,
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => {
        notificationCall('passed', 'Steps were successfully updated.');
      });
  };

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
        onConfirm={onSave}
        onCancel={() => setSteps(initialSteps)}
        isButtonsDisabled={!wasTouched}
        isEditable={mayEdit}
        enabled={mayEdit}
        forceEnableButtons={wasTouched}
      >
        {steps?.length === 0 ? (
          <EmptyTestsContainer>
            <Title level={2} className="text-center">
              This test suite doesn&#39;t have any tests yet
            </Title>
            <Button $customType="primary" onClick={() => showModal('test', 0)}>
              Add your first test
            </Button>
          </EmptyTestsContainer>
        ) : (
          <TestSuiteStepsFlow steps={steps} setSteps={setSteps} showModal={showModal} />
        )}
        <DelayModal
          isDelayModalVisible={isDelayModalVisible}
          setIsDelayModalVisible={setIsDelayModalVisible}
          addDelay={addNode}
        />
        <TestModal
          isTestModalVisible={isTestModalVisible}
          setIsTestModalVisible={setIsTestModalVisible}
          addTest={addNode}
        />
      </ConfigurationCard>
    </Form>
  );
};

export default memo(SettingsTests);
