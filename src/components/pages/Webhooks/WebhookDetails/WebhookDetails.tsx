import {FC, useContext} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';

import {Tag} from '@atoms';

import {MainContext} from '@contexts';

import {Button, Text} from '@custom-antd';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {SettingsLayout} from '@molecules';

import {PageHeader, PageWrapper} from '@organisms';

import {Error, Loading} from '@pages';
import PageMetadata from '@pages/PageMetadata';

import {useGetWebhookDetailsQuery} from '@services/webhooks';

import {useWebhooksPick, useWebhooksSync} from '@store/webhooks';

import ActionTab from './ActionTab';
import ConditionTab from './ConditionTab';
import GeneralTab from './GeneralTab';
import WebhookDefinition from './WebhookDefinition';

const WebhookDetails: FC = () => {
  const {isClusterAvailable} = useContext(MainContext);
  const {id: name, settingsTab = 'general'} = useParams() as {id: string; settingsTab?: string};

  const {data: webhook, error} = useGetWebhookDetailsQuery(name, {skip: !isClusterAvailable});

  const {current: currentWebhookDetails} = useWebhooksPick('current');
  useWebhooksSync({
    current: webhook?.name === name ? webhook : undefined,
  });

  const setTab = useDashboardNavigate((next: string) => `/webhooks/${name}/${next}`);
  const setSettingsTab = useDashboardNavigate((next: string) => `/webhooks/${name}/settings/${next}`);
  const back = useDashboardNavigate('/webhooks');

  if (error) {
    return <Error title={(error as any)?.data?.title} description={(error as any)?.data?.detail} />;
  }
  if (!webhook || !currentWebhookDetails) {
    return <Loading />;
  }

  return (
    <PageWrapper>
      <PageMetadata title={`${name} | Webhooks`} />

      <PageHeader
        onBack={back}
        title={
          <>
            <Text className="bold biggest">{name}</Text>
            <Tag title="Webhook" type="info" Icon={TestSuitesIcon} />
          </>
        }
        extra={[
          <Button key="run-now-button" $customType="secondary">
            Test this notification
          </Button>,
        ]}
      />
      <Tabs
        activeKey="settings"
        onChange={setTab}
        destroyInactiveTabPane
        items={[
          {
            key: 'settings',
            label: 'Settings',
            children: (
              <SettingsLayout
                active={settingsTab}
                tabs={[
                  {id: 'general', label: 'General', children: <GeneralTab />},
                  {id: 'condition', label: 'Condition', children: <ConditionTab />},
                  {id: 'action', label: 'Action', children: <ActionTab />},
                  {
                    id: 'definition',
                    label: 'Definition',
                    children: <WebhookDefinition />,
                  },
                ]}
                onChange={setSettingsTab}
              />
            ),
          },
        ]}
      />
    </PageWrapper>
  );
};

export default WebhookDetails;
