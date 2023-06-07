import {useContext, useEffect, useState} from 'react';

import {Select, Space, Tabs} from 'antd';

import {BaseQueryFn, FetchBaseQueryError, MutationDefinition} from '@reduxjs/toolkit/dist/query';
import {MutationTrigger} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {ExecutorIcon} from '@atoms';

import {AnalyticsContext, DashboardContext, EntityDetailsContext} from '@contexts';

import {Button, Text} from '@custom-antd';

import useExecutorIcon from '@hooks/useExecutorIcon';
import useLoadingIndicator from '@hooks/useLoadingIndicator';
import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {Entity} from '@models/entity';
import {Option as OptionType} from '@models/form';

import {CLICommands, DotsDropdown, LabelsList, MetricsBarChart, RunningContextType, notificationCall} from '@molecules';

import {PageHeader, PageWrapper} from '@organisms';

import PageMetadata from '@pages/PageMetadata';

import {Permissions, usePermission} from '@permissions/base';

import {useAppSelector} from '@redux/hooks';
import {selectRedirectTarget} from '@redux/reducers/configSlice';

import {useRunTestSuiteMutation} from '@services/testSuites';
import {useRunTestMutation} from '@services/tests';

import Colors from '@styles/Colors';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {EntityDetailsHeaderIcon} from './EntityDetailsContent.styled';
import ExecutionsTable from './ExecutionsTable';
import Settings from './Settings';
import SummaryGrid from './SummaryGrid';

const filterOptions: OptionType[] = [
  {value: 7, label: 'Timeframe: last 7 days', key: 'last7Days'},
  {value: 30, label: 'Timeframe: last 30 days', key: 'last30Days'},
  {value: 90, label: 'Timeframe: last 90 days', key: 'last90Days'},
  {value: 365, label: 'Timeframe: this year', key: 'thisYear'},
  {value: 0, label: 'See all executions', key: 'allDays'},
];

const EntityDetailsContent: React.FC = () => {
  const {entity, entityDetails, defaultStackRoute, metrics, daysFilterValue, setDaysFilterValue, abortAllExecutions} =
    useContext(EntityDetailsContext);
  const {analyticsTrack} = useContext(AnalyticsContext);
  const {navigate} = useContext(DashboardContext);
  const mayRun = usePermission(Permissions.runEntity);
  const {isLoading, handleLoading} = useLoadingIndicator(2000);

  const {settingsTabConfig} = useAppSelector(selectRedirectTarget);

  const [runTest] = useRunTestMutation();
  const [runTestSuite] = useRunTestSuiteMutation();

  const runRequestsMap: Record<
    Entity,
    MutationTrigger<MutationDefinition<any, BaseQueryFn<any, unknown, FetchBaseQueryError>, never, void, string>>
  > = {
    'test-suites': runTestSuite,
    tests: runTest,
  };

  const [activeTabKey, setActiveTabKey] = useState('Executions');

  useEffect(() => {
    if (settingsTabConfig) {
      setActiveTabKey('Settings');
    }
  }, [settingsTabConfig]);

  useTrackTimeAnalytics(`${entity}-details`, activeTabKey !== 'Settings');
  useTrackTimeAnalytics(`${entity}-settings`, activeTabKey === 'Settings');

  const name = entityDetails?.name;
  const namespace = entityDetails?.namespace;
  const description = entityDetails?.description;
  const labels = entityDetails?.labels;
  const type = entityDetails?.type;
  const testIcon = useExecutorIcon(entityDetails);

  const onRunButtonClick = async () => {
    handleLoading();
    const runEntity = runRequestsMap[entity];

    return runEntity({
      id: name,
      data: {
        namespace,
        runningContext: {
          type: RunningContextType.userUI,
        },
      },
    })
      .then(res => displayDefaultNotificationFlow(res))
      .then(() => {
        analyticsTrack('trackEvents', {
          type,
          uiEvent: `run-${entity}`,
        });
      })
      .catch(error => {
        notificationCall('failed', error.title, error.message);
      });
  };

  const onAbortAllExecutionsClick = () => {
    abortAllExecutions({id: name}).catch(() => {
      notificationCall('failed', `Something went wrong during ${entity} execution abortion`);
    });
  };

  const avatar = type
    ? {
        avatar: {
          icon: (
            <EntityDetailsHeaderIcon>
              <ExecutorIcon type={testIcon} />
            </EntityDetailsHeaderIcon>
          ),
        },
      }
    : {};

  const isMetricsEmpty = !metrics?.executions || !metrics?.executions.length;

  const isPageDisabled = !name;

  return (
    <PageWrapper>
      <PageMetadata title={name} description={description} />

      <PageHeader
        onBack={() => navigate(defaultStackRoute)}
        title={name || 'Loading...'}
        extra={[
          !isMetricsEmpty ? (
            <Select
              placeholder="Last 7/30/90/Year/All days"
              options={filterOptions}
              style={{width: 250}}
              value={daysFilterValue}
              onChange={setDaysFilterValue}
              key="days-filter-select"
            />
          ) : null,
          <DotsDropdown
            key="entity-options"
            items={[{key: 1, label: <span onClick={onAbortAllExecutionsClick}>Abort all executions</span>}]}
            wrapperStyle={{backgroundColor: Colors.slate800}}
          />,
          <Button
            key="run-now-button"
            type="primary"
            onClick={onRunButtonClick}
            disabled={isPageDisabled}
            hidden={!mayRun}
            loading={isLoading}
          >
            Run now
          </Button>,
        ]}
        className="testkube-pageheader"
        {...avatar}
      >
        <Space size={10} direction="vertical">
          {labels ? <LabelsList labels={labels} /> : null}
          {description ? (
            <Text color={Colors.slate400} className="middle">
              {description}
            </Text>
          ) : null}
        </Space>
      </PageHeader>
      {!isMetricsEmpty ? <SummaryGrid metrics={metrics} /> : null}
      <Tabs
        activeKey={activeTabKey}
        onChange={setActiveTabKey}
        destroyInactiveTabPane
        items={[
          {
            key: 'Executions',
            label: 'Recent executions',
            disabled: isPageDisabled,
            children: (
              <>
                <MetricsBarChart
                  data={metrics?.executions}
                  isDetailsView
                  executionDurationP50ms={metrics?.executionDurationP50ms}
                  executionDurationP95ms={metrics?.executionDurationP95ms}
                />
                <ExecutionsTable triggerRun={onRunButtonClick} />
              </>
            ),
          },
          {
            key: 'CLICommands',
            label: 'CLI Commands',
            disabled: isPageDisabled,
            children: <CLICommands name={name} bg={Colors.slate800} />,
          },
          {
            key: 'Settings',
            label: 'Settings',
            disabled: isPageDisabled,
            children: <Settings />,
          },
        ]}
      />
    </PageWrapper>
  );
};

export default EntityDetailsContent;
