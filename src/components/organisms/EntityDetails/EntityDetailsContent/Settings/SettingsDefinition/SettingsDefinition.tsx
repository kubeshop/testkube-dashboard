import {useContext} from 'react';

import {CopyButton, DownloadButton, ExternalLink, Pre} from '@atoms';

import {ConfigurationCard, Definition} from '@molecules';

import useLocation from '@hooks/useLocation';
import useSecureContext from '@hooks/useSecureContext';

import {EntityDetailsContext, MainContext} from '@contexts';

import {settingsDefinitionData} from './utils';

const SettingsDefinition: React.FC = () => {
  const {entityDetails, entity} = useContext(EntityDetailsContext);
  const {isClusterAvailable} = useContext(MainContext);

  const {name} = entityDetails;
  const sectionData = settingsDefinitionData[entity];
  const {data: definition = '', isLoading} = sectionData.query(name, {skip: !isClusterAvailable});
  const isSecureContext = useSecureContext();
  const filename = useLocation().lastPathSegment;

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
