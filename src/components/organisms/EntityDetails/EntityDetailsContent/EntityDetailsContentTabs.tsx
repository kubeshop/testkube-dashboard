import {FC, useEffect, useState} from 'react';

import {Tabs} from 'antd';

import useTrackTimeAnalytics from '@hooks/useTrackTimeAnalytics';

import {CLICommands, MetricsBarChart} from '@molecules';

import ExecutionsTable from '@organisms/EntityDetails/EntityDetailsContent/ExecutionsTable';
import Settings from '@organisms/EntityDetails/EntityDetailsContent/Settings';

import {useAppSelector} from '@redux/hooks';
import {selectSettingsTabConfig} from '@redux/reducers/configSlice';

import {useEntityDetailsPick} from '@store/entityDetails';

import Colors from '@styles/Colors';

interface EntityDetailsContentTabsProps {
  onRun: () => void;
}

const EntityDetailsContentTabs: FC<EntityDetailsContentTabsProps> = ({onRun}) => {
  const {entity, metrics, details} = useEntityDetailsPick('entity', 'metrics', 'details');
  const settingsTabConfig = useAppSelector(selectSettingsTabConfig);
  const [activeTabKey, setActiveTabKey] = useState('Executions');

  useEffect(() => {
    if (settingsTabConfig) {
      setActiveTabKey('Settings');
    }
  }, [settingsTabConfig]);

  useTrackTimeAnalytics(`${entity}-details`, activeTabKey !== 'Settings');
  useTrackTimeAnalytics(`${entity}-settings`, activeTabKey === 'Settings');

  return (
    <Tabs
      activeKey={activeTabKey}
      onChange={setActiveTabKey}
      destroyInactiveTabPane
      items={[
        {
          key: 'Executions',
          label: 'Recent executions',
          disabled: !details,
          children: (
            <>
              <MetricsBarChart
                data={metrics?.executions}
                isDetailsView
                executionDurationP50ms={metrics?.executionDurationP50ms}
                executionDurationP95ms={metrics?.executionDurationP95ms}
              />
              <ExecutionsTable onRun={onRun} />
            </>
          ),
        },
        {
          key: 'CLICommands',
          label: 'CLI Commands',
          disabled: !details,
          children: <CLICommands name={details?.name} bg={Colors.slate800} />,
        },
        {
          key: 'Settings',
          label: 'Settings',
          disabled: !details,
          children: <Settings />,
        },
      ]}
    />
  );
};

export default EntityDetailsContentTabs;
