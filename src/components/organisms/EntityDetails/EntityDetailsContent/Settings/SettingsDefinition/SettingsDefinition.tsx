import {useContext, useEffect, useState} from 'react';

import axios from 'axios';

import {CopyButton, Pre} from '@atoms';
import DownloadButton from '@atoms/DownloadButton/DownloadButton';

import {ConfigurationCard, Definition} from '@molecules';

import useQueryParams from '@hooks/useQueryParams';
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
  const filename = useQueryParams().lastPathSegment;

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
          Learn more about{' '}
          <a href={sectionData.helpLinkUrl} target="_blank">
            Definitions
          </a>
        </>
      }
    >
      {definition ? (
        <Definition content={definition}>
          {isSecureContext ? (
            <CopyButton content={definition} />
          ) : (
            /* TODO: Punksage: Add the way to customise name of the default filename to download */
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
