import {useContext} from 'react';

import {Form} from 'antd';

import {CopyButton, DownloadButton, ExternalLink, Pre} from '@atoms';

import {EntityDetailsContext, MainContext} from '@contexts';

import useLocation from '@hooks/useLocation';
import useSecureContext from '@hooks/useSecureContext';

import {ConfigurationCard, Definition} from '@molecules';

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
    <Form name="definition-form">
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
    </Form>
  );
};

export default SettingsDefinition;
