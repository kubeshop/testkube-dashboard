import {FC, useMemo} from 'react';

import {Select} from 'antd';

import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';

import {ExecutorIcon} from '@atoms';

import {Text} from '@custom-antd';

import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {useGetAllTestSuitesQuery} from '@services/testSuites';
import {useGetAllTestsQuery} from '@services/tests';

import {useExecutorsPick} from '@store/executors';

import Colors from '@styles/Colors';

import {StyledResourceOptionWrapper} from './ResourceTriggerSelect.styled';

const {Option, OptGroup} = Select;

interface ResourceTriggerSelectProps {
  $allowTests: boolean;
  $allowTestSuites: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const ResourceTriggerSelect: FC<ResourceTriggerSelectProps> = props => {
  const {$allowTestSuites, $allowTests, disabled, value, onChange, ...rest} = props;

  const isClusterAvailable = useSystemAccess(SystemAccess.agent);

  const {executors = []} = useExecutorsPick('executors');

  const {data: tests = []} = useGetAllTestsQuery(null, {skip: !isClusterAvailable || !$allowTests});
  const {data: testSuites = []} = useGetAllTestSuitesQuery(null, {
    skip: !isClusterAvailable || !$allowTestSuites,
  });

  const testsData = useMemo(() => {
    if (!$allowTests) return [];

    return tests.map(item => ({
      name: item.test.name,
      namespace: item.test.namespace,
      type: item.test.type,
    }));
  }, [tests, $allowTests]);

  const testSuitesData = useMemo(() => {
    if (!$allowTestSuites) return [];

    return testSuites.map(item => ({
      name: item.testSuite.name,
      namespace: item.testSuite.namespace,
    }));
  }, [testSuites, $allowTestSuites]);

  return (
    <Select optionLabelProp="key" placeholder="Your testkube resource" showSearch {...props}>
      {testsData.length > 0 ? (
        <OptGroup label="Tests">
          {testsData.map(item => (
            <Option key={item.name} title={item.name}>
              <StyledResourceOptionWrapper>
                <ExecutorIcon type={getTestExecutorIcon(executors, item.type)} />
                <Text className="regular middle">{item.name}</Text>
              </StyledResourceOptionWrapper>
            </Option>
          ))}
        </OptGroup>
      ) : null}
      {testSuitesData.length > 0 ? (
        <OptGroup label="Test Suites">
          {testSuitesData.map(item => (
            <Option key={item.name} title={item.name}>
              <StyledResourceOptionWrapper>
                <TestSuitesIcon fill={Colors.slate100} />
                <Text className="regular middle">{item.name}</Text>
              </StyledResourceOptionWrapper>
            </Option>
          ))}
        </OptGroup>
      ) : null}
    </Select>
  );
};

export default ResourceTriggerSelect;
