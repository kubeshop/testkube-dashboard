import {useContext, useEffect, useRef} from 'react';

import {Form} from 'antd';

import {CopyButton, DownloadButton, Pre} from '@atoms';

import {MainContext} from '@contexts';

import useLocation from '@hooks/useLocation';
import useSecureContext from '@hooks/useSecureContext';

import {ConfigurationCard} from '@molecules';
import DefinitionMonaco from '@molecules/Definition/DefinitionMonaco';

import {useGetTriggerDefinitionQuery} from '@services/triggers';

import {useStore} from '@store';

const TriggerDefinition = () => {
  const {isClusterAvailable} = useContext(MainContext);

  const {currentTrigger} = useStore(state => ({
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

  const monacoRef = useRef(null);

  const onSave = () => {
    // @ts-ignore
    console.log(monacoRef?.current?.getValue());
  };

  useEffect(() => {
    if (currentTrigger) {
      refetch();
    }
  }, [currentTrigger]);

  return (
    <Form name="definition-form">
      <ConfigurationCard
        title="Definition"
        description="Validate and export your trigger configuration"
        onConfirm={onSave}
        forceEnableButtons
      >
        {definition ? (
          <DefinitionMonaco content={definition} monacoRef={monacoRef} />
        ) : (
          <Pre>{isLoading ? ' Loading...' : ' No definition data'}</Pre>
        )}
      </ConfigurationCard>
    </Form>
  );
};

export default TriggerDefinition;
