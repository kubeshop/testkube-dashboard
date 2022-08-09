import {useContext, useEffect, useState} from 'react';

import axios from 'axios';

import {Pre} from '@atoms';

import {Text} from '@custom-antd';

import {ConfigurationCard, CopyCommand} from '@molecules';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

import Colors from '@styles/Colors';

import {EntityDetailsContext} from '@contexts';

import {settingsDefinitionData} from './utils';

const SettingsDefinition: React.FC = () => {
  const {entityDetails, entity} = useContext(EntityDetailsContext);

  const {name} = entityDetails;

  const sectionData = settingsDefinitionData[entity];

  const [definition, setDefinition] = useState('');
  const [isLoading, setLoading] = useState(false);

  const {setCopyToClipboardState} = useCopyToClipboard(definition);

  const onCopyClick = () => {
    setCopyToClipboardState(true);
  };

  const onGetTestCRD = async () => {
    setLoading(true);

    try {
      setDefinition('');

      const result = await axios(`${sectionData.apiEndpoint}${name}`, {
        method: 'GET',
        headers: {
          Accept: 'text/yaml',
        },
      });

      setDefinition(result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetTestCRD();
  }, [name]);

  return (
    <ConfigurationCard
      title="Definition"
      description={sectionData.description}
      onConfirm={onCopyClick}
      confirmButtonText="Copy"
      footerText={
        <Text className="regular middle">
          Learn more about{' '}
          <a href={sectionData.helpLinkUrl} target="_blank">
            Definitions
          </a>
        </Text>
      }
    >
      {definition ? (
        <CopyCommand command={definition} showDollar={false} bg={Colors.slate800} />
      ) : (
        <Pre>{isLoading ? 'Loading...' : 'No definition data'}</Pre>
      )}
    </ConfigurationCard>
  );
};

export default SettingsDefinition;
