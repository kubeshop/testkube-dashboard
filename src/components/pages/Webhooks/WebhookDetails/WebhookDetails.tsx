import {FC, useContext} from 'react';
import {useParams} from 'react-router-dom';

import {Tabs} from 'antd';

import {ReactComponent as TestSuitesIcon} from '@assets/test-suites-icon.svg';

import {Tag} from '@atoms';

import {DashboardContext} from '@contexts';

import {Button, Text} from '@custom-antd';

import {useLastCallback} from '@hooks/useLastCallback';

import {SettingsLayout} from '@molecules';

import {PageHeader, PageWrapper} from '@organisms';

import {useGetWebhookDetailsQuery} from '@services/webhooks';

import ActionTab from './ActionTab';
import ConditionTab from './ConditionTab';
import GeneralTab from './GeneralTab';
import WebhookDefinition from './WebhookDefinition';
import WebhookDetailsContext from './WebhookDetailsContext';

const WebhookDetails: FC = () => {
  const {id = '', settingsTab} = useParams();

  const {navigate} = useContext(DashboardContext);

  const {data: webhooksDetails} = useGetWebhookDetailsQuery(id);

  const setTab = useLastCallback((nextTab: string) => {
    navigate(`/webhooks/${id}/${nextTab}`);
  });

  const setSettingsTab = useLastCallback((nextTab: string) => {
    navigate(`/webhooks/${id}/settings/${nextTab}`);
  });

  return (
    <WebhookDetailsContext.Provider value={{webhooksDetails}}>
      <PageWrapper>
        <PageHeader
          onBack={() => navigate('/webhooks')}
          title={
            <>
              <Text className="bold biggest">{webhooksDetails?.name || 'Loading...'}</Text>
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
    </WebhookDetailsContext.Provider>
  );
};

export default WebhookDetails;
