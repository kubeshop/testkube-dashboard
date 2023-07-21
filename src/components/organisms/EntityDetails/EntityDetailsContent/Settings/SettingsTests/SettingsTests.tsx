import {memo, useContext, useEffect, useMemo, useState} from 'react';

import {Form} from 'antd';

import {nanoid} from '@reduxjs/toolkit';

import pick from 'lodash/pick';

import {ExternalLink} from '@atoms';

import {EntityDetailsContext, MainContext} from '@contexts';

import {Button, FullWidthSpace, Title} from '@custom-antd';

import useClusterVersionMatch from '@hooks/useClusterVersionMatch';

import {TestSuiteStepTest} from '@models/test';
import {LocalStep, TestSuite} from '@models/testSuite';

import {ConfigurationCard, InlineNotification, notificationCall} from '@molecules';

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

    return entityDetails.steps
      .filter(step => step.execute?.length)
      .map(step => {
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

  const showTestModal = (group: number) => {
    setIsTestModalVisible(true);
    setCurrentGroup(group);
  };

  const showDelayModal = (group: number) => {
    setIsDelayModalVisible(true);
    setCurrentGroup(group);
  };

  const addNode = (data: string | {name: string; type: string}) => {
    const item =
      typeof data === 'object'
        ? {id: nanoid(), test: data.name, type: data.type}
        : {id: nanoid(), delay: !Number.isNaN(Number(data)) ? `${data}ms` : data};

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
      const stopOnFailure = Boolean(entityDetails?.steps?.[i]?.stopOnFailure);
      const execute = items.map(item => pick(item, ['delay', 'test', 'namespace']));

      const v2Execute =
        'test' in execute[0]
          ? {
              name: execute[0].test,
              namespace: execute[0].namespace,
            }
          : {delay: execute[0].delay};

      return {
        execute: isV2 ? v2Execute : execute,
        stopOnFailure,
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
    <FullWidthSpace size={16} direction="vertical">
      {!isV2 ? null : (
        <InlineNotification
          type="error"
          title="Your agent needs to be updated"
          description={
            <>
              You are running an older agent on this environment. Updating your Testkube will enable parallel tests and
              other new features.
            </>
          }
        />
      )}
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
          onConfirm={onSave}
          onCancel={() => setSteps(initialSteps)}
          isButtonsDisabled={!wasTouched}
          isEditable={mayEdit}
          enabled={mayEdit}
          forceEnableButtons={wasTouched}
        >
          {!steps?.length ? (
            <EmptyTestsContainer>
              <Title level={2} className="text-center">
                This test suite doesn&#39;t have any tests yet
              </Title>
              <Button $customType="primary" onClick={() => showTestModal(0)}>
                Add your first test
              </Button>
            </EmptyTestsContainer>
          ) : (
            <TestSuiteStepsFlow
              steps={steps}
              setSteps={setSteps}
              showTestModal={showTestModal}
              showDelayModal={showDelayModal}
              isV2={isV2}
            />
          )}
          <DelayModal visible={isDelayModalVisible} onClose={() => setIsDelayModalVisible(false)} onSubmit={addNode} />
          <TestModal visible={isTestModalVisible} onClose={() => setIsTestModalVisible(false)} onSubmit={addNode} />
        </ConfigurationCard>
      </Form>
    </FullWidthSpace>
  );
};

export default memo(SettingsTests);
