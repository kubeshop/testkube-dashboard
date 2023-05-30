import {useContext, useEffect} from 'react';

import {Form} from 'antd';

import {CopyButton, DownloadButton, Pre} from '@atoms';

import {MainContext} from '@contexts';

import useLocation from '@hooks/useLocation';
import useSecureContext from '@hooks/useSecureContext';

import {ConfigurationCard, Definition as DefinitionContent} from '@molecules';

import {useGetTriggerDefinitionQuery} from '@services/triggers';

import useTriggersLocalStore from '@store/TriggersLocalStore';

const TriggerDefinition = () => {
  const {isClusterAvailable} = useContext(MainContext);

  const [useShallowLocalStore] = useTriggersLocalStore();

  const {currentTrigger} = useShallowLocalStore(state => ({
    currentTrigger: state.currentTrigger!,
  }));

  const isSecureContext = useSecureContext();
  const {
    data: definition = '',
    isLoading,
    refetch,
  } = useGetTriggerDefinitionQuery(currentTrigger.name, {
    skip: !isClusterAvailable,
  });
  const filename = useLocation().lastPathSegment;

  useEffect(() => {
    if (currentTrigger) {
      refetch();
    }
  }, [currentTrigger]);
  return (
    <Form name="definition-form">
      <ConfigurationCard title="Definition" description="Validate and export your trigger configuration">
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
    </Form>
  );
};

export default TriggerDefinition;
