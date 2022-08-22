import {useContext, useEffect, useState} from 'react';

import {Select, Tabs} from 'antd';

import {Entity} from '@models/entity';
import {Option as OptionType} from '@models/form';

import {useAppSelector} from '@redux/hooks';
import {selectRedirectTarget} from '@redux/reducers/configSlice';

import {TestRunnerIcon} from '@atoms';

import {Button, Text} from '@custom-antd';

import {CLICommands, LabelsList} from '@molecules';

import {displayDefaultErrorNotification} from '@utils/notification';

import {useRunTestSuiteMutation} from '@services/testSuites';
import {useRunTestMutation} from '@services/tests';

import Colors from '@styles/Colors';

import {EntityDetailsContext, MainContext} from '@contexts';

import {StyledContainer, StyledPageHeader, TabsWrapper} from './EntityDetailsContent.styled';
import ExecutionsTable from './ExecutionsTable';
import Settings from './Settings';
import SummaryGrid from './SummaryGrid';

const filterOptions: OptionType[] = [
  {value: 7, label: '7 days (default)'},
  {value: 30, label: '30 days'},
  {value: 90, label: '90 days'},
  {value: 0, label: 'All days'},
];

const EntityDetailsContent: React.FC = () => {
  const {entity, entityDetails, onRowSelect, defaultStackRoute, metrics, daysFilterValue, setDaysFilterValue} =
    useContext(EntityDetailsContext);
  const {navigate} = useContext(MainContext);

  const {isSettingsTabConfig} = useAppSelector(selectRedirectTarget);

  const [runTest] = useRunTestMutation();
  const [runTestSuite] = useRunTestSuiteMutation();

  const runRequestsMap: {[key in Entity]: any} = {
    'test-suites': runTestSuite,
    tests: runTest,
  };

  const [activeTabKey, setActiveTabKey] = useState('Executions');

  useEffect(() => {
    if (isSettingsTabConfig) {
      setActiveTabKey('Settings');
    }
  }, [isSettingsTabConfig]);

  const name = entityDetails?.name;
  const description = entityDetails?.description;
  const labels = entityDetails?.labels;
  const type = entityDetails?.type;

  const onRunButtonClick = async () => {
    const runEntity = runRequestsMap[entity];

    runEntity({
      id: name,
      data: {
        namespace: 'testkube',
      },
    })
      .then((result: any) => {
        if (result.error) {
          return displayDefaultErrorNotification(result.error.error);
        }

        setTimeout(() => {
          onRowSelect(result?.data, true);
        }, 1500);
      })
      .catch((err: any) => displayDefaultErrorNotification(err));
  };

  const avatar = type
    ? {
        avatar: {icon: <TestRunnerIcon icon={type} noWidth />},
      }
    : {};

  return (
    <StyledContainer>
      <StyledPageHeader
        onBack={() => navigate(defaultStackRoute)}
        title={name || 'Loading...'}
        subTitle={labels ? <LabelsList labels={entityDetails?.labels} /> : ''}
        extra={[
          <Select
            placeholder="Last 7/30/90/Year/All days"
            options={filterOptions}
            style={{width: 250}}
            value={daysFilterValue}
            onChange={setDaysFilterValue}
          />,
          <Button key="1" type="primary" onClick={onRunButtonClick}>
            Run now
          </Button>,
        ]}
        className="testkube-pageheader"
        {...avatar}
      >
        {description ? (
          <Text color={Colors.slate400} className="middle">
            {description}
          </Text>
        ) : null}
      </StyledPageHeader>
      <SummaryGrid metrics={metrics} />
      <TabsWrapper activeKey={activeTabKey} onChange={setActiveTabKey}>
        <Tabs.TabPane tab="Recent executions" key="Executions">
          <ExecutionsTable triggerRun={onRunButtonClick} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="CLI Commands" key="CLICommands">
          <CLICommands name={name} bg={Colors.slate800} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Settings" key="Settings">
          <Settings />
        </Tabs.TabPane>
      </TabsWrapper>
    </StyledContainer>
  );
};

export default EntityDetailsContent;
