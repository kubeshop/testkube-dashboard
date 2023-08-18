import {FC, useContext, useMemo} from 'react';

import {Select} from 'antd';

import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';

import {ExecutorIcon} from '@atoms';

import {MainContext} from '@contexts';

import {Text} from '@custom-antd';

import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {useGetAllTestSuitesQuery} from '@services/testSuites';
import {useGetAllTestsQuery} from '@services/tests';

import {useExecutorsPick} from '@store/executors';

import Colors from '@styles/Colors';

import {StyledResourceOptionWrapper} from './ResourceTriggerSelect.styled';

const {Option, OptGroup} = Select;

interface ResourceTriggerSelectProps {
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const ResourceTriggerSelect: FC<ResourceTriggerSelectProps> = ({...props}) => {
  const {isClusterAvailable} = useContext(MainContext);

  const {executors = []} = useExecutorsPick('executors');

  const {data: tests = []} = useGetAllTestsQuery(null, {skip: !isClusterAvailable});
  const {data: testSuites = []} = useGetAllTestSuitesQuery(null, {
    skip: !isClusterAvailable,
  });

  const testsData = useMemo(() => {
    return tests.map(item => ({
      name: item.test.name,
      namespace: item.test.namespace,
      type: item.test.type,
    }));
  }, [tests]);

  const testSuitesData = useMemo(() => {
    return testSuites.map(item => ({
      name: item.testSuite.name,
      namespace: item.testSuite.namespace,
    }));
  }, [testSuites]);

  return (
    <Select optionLabelProp="key" placeholder="Your testkube resource" {...props}>
      {testsData.length > 0 ? (
        <OptGroup label="Tests">
          {testsData.map(item => (
            <Option key={item.name}>
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
            <Option key={item.name}>
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
