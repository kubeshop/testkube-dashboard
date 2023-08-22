import {memo, useContext, useEffect, useMemo, useState} from 'react';

import {nanoid} from '@reduxjs/toolkit';

import pick from 'lodash/pick';

import {ExternalLink} from '@atoms';

import {MainContext} from '@contexts';

import {Button, FullWidthSpace, Title} from '@custom-antd';

import useClusterVersionMatch from '@hooks/useClusterVersionMatch';

import {TestSuiteStepTest} from '@models/test';
import {LocalStep, TestSuite} from '@models/testSuite';

import {InlineNotification, notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {useGetTestsListForTestSuiteQuery, useUpdateTestSuiteMutation} from '@services/testSuites';

import {useEntityDetailsPick} from '@store/entityDetails';
import {useExecutorsPick} from '@store/executors';

import {externalLinks} from '@utils/externalLinks';
import {formatMilliseconds} from '@utils/formatMilliseconds';
import {displayDefaultNotificationFlow} from '@utils/notification';

import DelayModal from './Modals/DelayModal';
import TestModal from './Modals/TestModal';
import {EmptyTestsContainer} from './SettingsTests.styled';
import TestSuiteStepsFlow from './TestSuiteStepsFlow';

const SettingsTests = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {details, isV2: rawIsV2} = useEntityDetailsPick('details', 'isV2') as {details: TestSuite; isV2: boolean};

  const isV2 = useClusterVersionMatch('<1.13.0', rawIsV2);

  const {executors} = useExecutorsPick('executors');

  const mayEdit = usePermission(Permissions.editEntity);

  const {data: testsList} = useGetTestsListForTestSuiteQuery(details.name, {
    skip: !isClusterAvailable || !details.name,
  });
  const [updateTestSuite] = useUpdateTestSuiteMutation();

  const testsData: TestSuiteStepTest[] = useMemo(() => {
    return (testsList || []).map(item => ({
      name: item.name,
      namespace: item.namespace,
      type: getTestExecutorIcon(executors || [], item.type),
    }));
  }, [testsList]);

  const initialSteps: LocalStep[][] = useMemo(() => {
    if (!details.steps) {
      return [];
    }

    return details.steps
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
  const [currentGroup, setCurrentGroup] = useState<number>(0);

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

  // index may be i.e. 3.5, which means inserting between index 3 and 4
  const insertStep = (item: LocalStep, index: number) => {
    const prevIndex = Math.floor(index);
    const nextIndex = Math.ceil(index);

    if (prevIndex === nextIndex) {
      setSteps([...steps.slice(0, index), [...steps[index], item], ...steps.slice(index + 1)]);
    } else {
      setSteps([...steps.slice(0, nextIndex), [item], ...steps.slice(nextIndex)]);
    }
  };

  const addTest = (test: {test: string; type: string}) => insertStep({id: nanoid(), ...test}, currentGroup);
  const addDelay = (delay: string) => insertStep({id: nanoid(), delay}, currentGroup);

  const onSave = () => {
    const resultSteps = steps.map((items, i) => {
      const stopOnFailure = Boolean(details?.steps?.[i]?.stopOnFailure);
      const execute = items.map(item => pick(item, ['delay', 'test', 'namespace']));

      if (isV2) {
        const step = execute[0];
        if ('test' in step) {
          return {execute: {name: step.test}, stopTestOnFailure: stopOnFailure};
        }
        return {delay: {duration: formatMilliseconds(step.delay!)}};
      }
      return {execute, stopOnFailure};
    });

    return updateTestSuite({
      id: details.name,
      data: {
        ...details,
        steps: resultSteps,
      },
    })
      .then(displayDefaultNotificationFlow)
      .then(() => {
        notificationCall('passed', 'Steps were successfully updated.');
      });
  };

  const v2Notification = !isV2 ? null : (
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
  );

  const footer = (
    <>
      Learn more about <ExternalLink href={externalLinks.testSuitesCreating}>Tests in a test suite</ExternalLink>
    </>
  );

  const form = (
    <CardForm
      name="define-tests-form"
      title="Tests"
      description="Define the tests and their order of execution for this test suite"
      footer={footer}
      disabled={!mayEdit}
      wasTouched={wasTouched}
      onConfirm={onSave}
      onCancel={() => setSteps(initialSteps)}
    >
      {!steps?.length ? (
        <EmptyTestsContainer>
          <Title level={2} className="text-center">
            This test suite doesn&#39;t have any tests yet
          </Title>
          <Button $customType="primary" onClick={() => showTestModal(-0.5)}>
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
      <DelayModal visible={isDelayModalVisible} onClose={() => setIsDelayModalVisible(false)} onSubmit={addDelay} />
      <TestModal visible={isTestModalVisible} onClose={() => setIsTestModalVisible(false)} onSubmit={addTest} />
    </CardForm>
  );

  return (
    <FullWidthSpace size={16} direction="vertical">
      {v2Notification}
      {form}
    </FullWidthSpace>
  );
};

export default memo(SettingsTests);
