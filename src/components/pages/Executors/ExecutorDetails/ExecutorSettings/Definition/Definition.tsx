import {useEffect, useState} from 'react';

import axios from 'axios';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor} from '@redux/reducers/executorsSlice';

import {Pre} from '@atoms';

import {ConfigurationCard, Definition as DefinitionContent} from '@molecules';

import {useCopyToClipboard} from '@hooks/useCopyToClipboard';

const Definition = () => {
  const executor = useAppSelector(selectCurrentExecutor);
  const [definition, setDefinition] = useState('');
  const [isLoading, setLoading] = useState(false);

  const {setCopyToClipboardState} = useCopyToClipboard(definition);

  const onCopyClick = () => {
    setCopyToClipboardState(true);
  };

  const name = executor?.name;

  const onGetTestCRD = async () => {
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
    onGetTestCRD();
  }, [name]);

  return (
    <ConfigurationCard
      title="Definition"
      description="Validate and export your container executor configuration"
      onConfirm={onCopyClick}
      confirmButtonText="Copy"
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
