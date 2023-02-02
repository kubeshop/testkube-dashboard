import {useEffect, useState} from 'react';

import axios from 'axios';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource} from '@redux/reducers/sourcesSlice';

import {CopyButton, Pre} from '@atoms';
import DownloadButton from '@atoms/DownloadButton/DownloadButton';

import {ConfigurationCard, Definition as DefinitionContent} from '@molecules';

import useSecureContext from '@hooks/useSecureContext';

const SourceSettingsDefinition = () => {
  const source = useAppSelector(selectCurrentSource);
  const isSecureContext = useSecureContext();
  const [definition, setDefinition] = useState('');
  const [isLoading, setLoading] = useState(false);

  const name = source?.name;

  const onGetSourceCRD = async () => {
    setLoading(true);

    try {
      setDefinition('');

      const result = await axios(`/test-sources/${name}`, {
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
    onGetSourceCRD();
  }, [name]);

  return (
    <ConfigurationCard title="Definition" description="Validate and export your source configuration">
      {definition ? (
        <DefinitionContent content={definition}>
          {isSecureContext ? (
            <CopyButton content={definition} />
          ) : (
            /* TODO: Punksage: Add the way to customise name of the default filename to download */
            <DownloadButton filename="definition.sh" content={definition} />
          )}
        </DefinitionContent>
      ) : (
        <Pre>{isLoading ? ' Loading...' : ' No definition data'}</Pre>
      )}
    </ConfigurationCard>
  );
};

export default SourceSettingsDefinition;
