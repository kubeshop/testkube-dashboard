import {useContext} from 'react';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource} from '@redux/reducers/sourcesSlice';

import {CopyButton, DownloadButton, Pre} from '@atoms';

import {ConfigurationCard, Definition as DefinitionContent} from '@molecules';

import {useGetSourceDefinitionQuery} from '@services/sources';

import {MainContext} from '@contexts';

import useLocation from '@hooks/useLocation';
import useSecureContext from '@hooks/useSecureContext';

const SourceSettingsDefinition = () => {
  const {isClusterAvailable} = useContext(MainContext);

  const source = useAppSelector(selectCurrentSource)!;
  const isSecureContext = useSecureContext();
  const {data: definition = '', isLoading} = useGetSourceDefinitionQuery(source?.name, {skip: !isClusterAvailable});
  const filename = useLocation().lastPathSegment;

  return (
    <ConfigurationCard title="Definition" description="Validate and export your source configuration">
      {definition ? (
        <DefinitionContent content={definition}>
          {isSecureContext ? (
            <CopyButton content={definition} />
          ) : (
            <DownloadButton filename={filename} extension="yaml" content={definition} />
          )}
        </DefinitionContent>
      ) : (
        <Pre>{isLoading ? ' Loading...' : ' No definition data'}</Pre>
      )}
    </ConfigurationCard>
  );
};

export default SourceSettingsDefinition;
