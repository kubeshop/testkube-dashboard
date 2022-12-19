import {useEffect, useState} from 'react';

import axios from 'axios';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentSource} from '@redux/reducers/sourcesSlice';

import {Pre} from '@atoms';

import {ConfigurationCard, Definition as DefinitionContent} from '@molecules';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

const Definition = () => {
  const source = useAppSelector(selectCurrentSource);
  const [definition, setDefinition] = useState('');
  const [isLoading, setLoading] = useState(false);

  const {isCopied, setCopyToClipboardState} = useCopyToClipboard(definition);

  const onCopyClick = () => {
    setCopyToClipboardState(true);
  };

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
    <ConfigurationCard
      title="Definition"
      description="Validate and export your source configuration"
      onConfirm={onCopyClick}
      confirmButtonText={isCopied ? 'Copied' : 'Copy'}
    >
      {definition ? (
        <DefinitionContent content={definition} />
      ) : (
        <Pre>{isLoading ? 'Loading...' : 'No definition data'}</Pre>
      )}
    </ConfigurationCard>
  );
};

export default Definition;
