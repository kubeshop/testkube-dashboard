import {useMemo} from 'react';

import CopyButton from '@atoms/CopyButton';
import ExternalLink from '@atoms/ExternalLink';
import MonacoEditor from '@atoms/MonacoEditor';

import {Text} from '@custom-antd';

import ConfigurationCard from '@molecules/ConfigurationCard';

import Colors from '@src/styles/Colors';
import {externalLinks} from '@src/utils/externalLinks';
import {createGhActionOSSYaml} from '@src/utils/ghAction';

import {useClusterDetailsPick} from '@store/clusterDetails';
import {useEntityDetailsPick} from '@store/entityDetails';

import {Content, MonacoContainer} from './GHActions.styled';

const GHActions = () => {
  const {details} = useEntityDetailsPick('id', 'details', 'error', 'metrics');
  const {namespace} = useClusterDetailsPick('namespace');

  const content = useMemo(
    () => createGhActionOSSYaml({namespace, testName: details?.name}),
    [namespace, details?.name]
  );

  return (
    <ConfigurationCard
      readOnly
      name="GitHub Action"
      title="GitHub Action"
      description="Run your action with a HTTP request – or we could do something nicer like testkube/testkube-docker-action."
      footer={
        <Text className="regular middle" color={Colors.slate400}>
          Learn more about{' '}
          <ExternalLink href={externalLinks.githubActions}>using Testkube with GitHub actions</ExternalLink>
        </Text>
      }
    >
      <>
        <Text className="regular middle" color={Colors.slate400}>
          Your GitHub action will require you to have an API token defined.{' '}
          <ExternalLink href={externalLinks.tkAPICloudTokens}>Manage your tokens</ExternalLink>
        </Text>
        <Content>
          <Text className="regular" color={Colors.slate200}>
            Action
          </Text>

          <MonacoContainer>
            <MonacoEditor language="yaml" value={content} />
            <CopyButton content={content} />
          </MonacoContainer>
        </Content>
      </>
    </ConfigurationCard>
  );
};

export default GHActions;
