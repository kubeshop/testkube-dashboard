import {useContext} from 'react';

import {Text} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import {EntityExecutionsContext} from '@contexts';

import {getDefinition} from './utils';

const SettingsDefinition: React.FC = () => {
  const {entityDetails, entity} = useContext(EntityExecutionsContext);

  const definition = getDefinition(entity, entityDetails);

  const {setCopyToClipboardState} = useCopyToClipboard(definition);

  const onCopyClick = () => {
    setCopyToClipboardState(true);
  };

  return (
    <ConfigurationCard
      title="Definition"
      description="Validate and export your test configuration"
      onConfirm={onCopyClick}
      confirmButtonText="Copy"
      footerText={
        <Text className="regular middle">
          Learn more about{' '}
          <a href="https://kubeshop.github.io/testkube/testsuites-creating/" target="_blank">
            Definitions
          </a>
        </Text>
      }
    >
      <pre>{definition}</pre>
    </ConfigurationCard>
  );
};

export default SettingsDefinition;
