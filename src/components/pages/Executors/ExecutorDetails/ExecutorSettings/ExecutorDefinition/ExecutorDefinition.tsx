import {useContext} from 'react';

import {Form} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectCurrentExecutor} from '@redux/reducers/executorsSlice';

import {CopyButton, DownloadButton, Pre} from '@atoms';

import {ConfigurationCard, Definition as DefinitionContent} from '@molecules';

import {useGetExecutorDefinitionQuery} from '@services/executors';

import {MainContext} from '@contexts';

import useLocation from '@hooks/useLocation';
import useSecureContext from '@hooks/useSecureContext';

const ExecutorDefinition = () => {
  const {isClusterAvailable} = useContext(MainContext);

  const executor = useAppSelector(selectCurrentExecutor);
  const {data: definition = '', isLoading} = useGetExecutorDefinitionQuery(executor?.name, {skip: !isClusterAvailable});
  const isSecureContext = useSecureContext();
  const filename = useLocation().lastPathSegment;

  return (
    <Form name="definition-form">
      <ConfigurationCard title="Definition" description="Validate and export your container executor configuration">
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

export default ExecutorDefinition;
