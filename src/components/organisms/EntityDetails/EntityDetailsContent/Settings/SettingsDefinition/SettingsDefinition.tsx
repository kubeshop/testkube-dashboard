import {useContext, useEffect, useState} from 'react';

import axios from 'axios';

import {CopyButton, ExternalLink, Pre} from '@atoms';
import DownloadButton from '@atoms/DownloadButton/DownloadButton';

import {ConfigurationCard, Definition} from '@molecules';

import useLocation from '@hooks/useLocation';
import useSecureContext from '@hooks/useSecureContext';

import {EntityDetailsContext} from '@contexts';

import {settingsDefinitionData} from './utils';

const SettingsDefinition: React.FC = () => {
  const {entityDetails, entity} = useContext(EntityDetailsContext);

  const {name} = entityDetails;
  const sectionData = settingsDefinitionData[entity];
  const [definition, setDefinition] = useState('');
  const [isLoading, setLoading] = useState(false);
  const isSecureContext = useSecureContext();
  const filename = useLocation().lastPathSegment;

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
      // eslint-disable-next-line no-empty
    } catch (err) {
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
      footerText={
        <>
          Learn more about <ExternalLink href={sectionData.helpLinkUrl}>Definitions</ExternalLink>
        </>
      }
    >
      {definition ? (
        <Definition content={definition}>
          {isSecureContext ? (
            <CopyButton content={definition} />
          ) : (
            <DownloadButton filename={filename} extension="yaml" content={definition} />
          )}
        </Definition>
      ) : (
        <Pre>{isLoading ? 'Loading...' : 'No definition data'}</Pre>
      )}
    </ConfigurationCard>
  );
};

export default SettingsDefinition;
