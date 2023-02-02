import {useEffect, useState} from 'react';

import axios from 'axios';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor} from '@redux/reducers/executorsSlice';

import {CopyButton, Pre} from '@atoms';
import DownloadButton from '@atoms/DownloadButton/DownloadButton';

import {ConfigurationCard, Definition as DefinitionContent} from '@molecules';

import useQueryParams from '@hooks/useQueryParams';
import useSecureContext from '@hooks/useSecureContext';

const ExecutorDefinition = () => {
  const executor = useAppSelector(selectCurrentExecutor);
  const [definition, setDefinition] = useState('');
  const [isLoading, setLoading] = useState(false);
  const isSecureContext = useSecureContext();
  const filename = useQueryParams().lastPathSegment;

  const name = executor?.name;

  const onGetExecutorCRD = async () => {
    setLoading(true);

    try {
      setDefinition('');

      const result = await axios(`/executors/${name}`, {
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
    onGetExecutorCRD();
  }, [name]);

  return (
    <ConfigurationCard title="Definition" description="Validate and export your container executor configuration">
      {definition ? (
        <DefinitionContent content={definition}>
          {isSecureContext ? (
            <CopyButton content={definition} />
          ) : (
            /* TODO: Punksage: Add the way to customise name of the default filename to download */
            <DownloadButton filename={filename} extension="yaml" content={definition} />
          )}
        </DefinitionContent>
      ) : (
        <Pre>{isLoading ? ' Loading...' : ' No definition data'}</Pre>
      )}
    </ConfigurationCard>
  );
};

export default ExecutorDefinition;
