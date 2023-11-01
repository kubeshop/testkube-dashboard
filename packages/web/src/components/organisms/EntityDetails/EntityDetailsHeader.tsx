import {FC, useMemo} from 'react';

import {Select, Space} from 'antd';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {ExecutorIcon, Tag} from '@atoms';

import {Button, Text} from '@custom-antd';

import useExecutorIcon from '@hooks/useExecutorIcon';

import {Entity} from '@models/entity';
import {Option as OptionType} from '@models/form';

import {DotsDropdown, LabelsList, notificationCall} from '@molecules';

import {PageHeader} from '@organisms';

import {Permissions, usePermission} from '@permissions/base';

import {useEntityDetailsField, useEntityDetailsPick} from '@store/entityDetails';

import Colors from '@styles/Colors';

import {EntityDetailsHeaderIcon} from './EntityDetails.styled';

const filterOptions: OptionType[] = [
  {value: 7, label: 'Timeframe: last 7 days', key: 'last7Days'},
  {value: 30, label: 'Timeframe: last 30 days', key: 'last30Days'},
  {value: 90, label: 'Timeframe: last 90 days', key: 'last90Days'},
  {value: 365, label: 'Timeframe: this year', key: 'thisYear'},
  {value: 0, label: 'See all executions', key: 'allDays'},
];

interface EntityDetailsHeaderProps {
  entity: Entity;
  isRunning?: boolean;
  onRun: () => void;
  onBack: () => void;
  useAbortAllExecutions: UseMutation<MutationDefinition<any, any, any, any, any>>;
  onEditTest: () => void;
  outOfSync?: boolean;
  isAgentAvailable?: boolean;
}

const EntityDetailsHeader: FC<EntityDetailsHeaderProps> = ({
  isRunning,
  onRun,
  onBack,
  useAbortAllExecutions,
  onEditTest,
  outOfSync,
  isAgentAvailable,
}) => {
  const mayRun = usePermission(Permissions.runEntity);
  const {entity, details} = useEntityDetailsPick('entity', 'details');
  const [daysFilterValue, setDaysFilterValue] = useEntityDetailsField('daysFilterValue');
  const testIcon = useExecutorIcon(details);
  const {executions} = useEntityDetailsPick('executions');

  const [abortAllExecutions] = useAbortAllExecutions();
  const onAbortAllExecutionsClick = () => {
    abortAllExecutions({id: details!.name}).catch(() => {
      notificationCall('failed', `Something went wrong during ${entity} execution abortion`);
    });
  };
  const entityOptionsMenu = useMemo(
    () =>
      [
        {key: 1, label: <span onClick={onEditTest}>Edit {entity === 'tests' ? 'Test' : 'Test Suite'}</span>},
        executions?.totals?.running && {
          key: 2,
          label: <span onClick={onAbortAllExecutionsClick}>Abort all executions</span>,
        },
      ].filter(Boolean),
    [executions?.totals?.running]
  );

  return (
    <PageHeader
      onBack={onBack}
      title={details!.name}
      pageTitleAddon={
        outOfSync ? (
          <Tag
            title="read-only"
            type="warning"
            tooltipMessage={
              isAgentAvailable
                ? 'This test is not currently present on your agent. You are only able to see historical data.'
                : 'This test is potentially not in sync with the data on your local cluster. You are only able to see historical data.'
            }
          />
        ) : undefined
      }
      extra={[
        <Select
          placeholder="Last 7/30/90/Year/All days"
          options={filterOptions}
          style={{width: 250}}
          value={daysFilterValue}
          onChange={setDaysFilterValue}
          key="days-filter-select"
        />,
        <DotsDropdown
          key="entity-options"
          items={entityOptionsMenu}
          wrapperStyle={{backgroundColor: Colors.slate800}}
          disabled={outOfSync}
        />,
        <Button
          key="run-now-button"
          type="primary"
          onClick={onRun}
          disabled={!details || outOfSync}
          hidden={!mayRun}
          loading={isRunning}
        >
          Run now
        </Button>,
      ]}
      className="testkube-pageheader"
      avatar={
        details!.type
          ? {
              icon: (
                <EntityDetailsHeaderIcon>
                  <ExecutorIcon type={testIcon} />
                </EntityDetailsHeaderIcon>
              ),
            }
          : undefined
      }
    >
      <Space size={10} direction="vertical">
        {details!.labels ? <LabelsList labels={details.labels} /> : null}
        {details!.description ? (
          <Text color={Colors.slate400} className="middle">
            {details.description}
          </Text>
        ) : null}
      </Space>
    </PageHeader>
  );
};

export default EntityDetailsHeader;
