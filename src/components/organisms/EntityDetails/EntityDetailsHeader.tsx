import {FC} from 'react';

import {Select, Space} from 'antd';

import {UseMutation} from '@reduxjs/toolkit/dist/query/react/buildHooks';
import {MutationDefinition} from '@reduxjs/toolkit/query';

import {ExecutorIcon} from '@atoms';

import {Button, Text} from '@custom-antd';

import useExecutorIcon from '@hooks/useExecutorIcon';

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
  isRunning?: boolean;
  onRun: () => void;
  onBack: () => void;
  useAbortAllExecutions: UseMutation<MutationDefinition<any, any, any, any, any>>;
  onEditTest: () => void;
}

const EntityDetailsHeader: FC<EntityDetailsHeaderProps> = ({
  isRunning,
  onRun,
  onBack,
  useAbortAllExecutions,
  onEditTest,
}) => {
  const mayRun = usePermission(Permissions.runEntity);
  const {entity, details} = useEntityDetailsPick('entity', 'details');
  const [daysFilterValue, setDaysFilterValue] = useEntityDetailsField('daysFilterValue');
  const testIcon = useExecutorIcon(details);

  const [abortAllExecutions] = useAbortAllExecutions();
  const onAbortAllExecutionsClick = () => {
    abortAllExecutions({id: details!.name}).catch(() => {
      notificationCall('failed', `Something went wrong during ${entity} execution abortion`);
    });
  };

  return (
    <PageHeader
      onBack={onBack}
      title={details!.name}
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
          items={[
            {key: 1, label: <span onClick={onEditTest}>Edit Test</span>},
            {key: 2, label: <span onClick={onAbortAllExecutionsClick}>Abort all executions</span>},
          ]}
          wrapperStyle={{backgroundColor: Colors.slate800}}
        />,
        <Button
          key="run-now-button"
          type="primary"
          onClick={onRun}
          disabled={!details}
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
        {details!.labels ? (
          <LabelsList
            labels={Object.entries(details.labels).map(([key, value]) => ({
              value: String(value),
              label: key,
            }))}
          />
        ) : null}
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
