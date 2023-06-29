import React, {PropsWithChildren, Suspense, useContext, useEffect, useState} from 'react';

import {Form} from 'antd';

import {MutationDefinition, QueryDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation, UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {JSONSchema4} from 'json-schema';

import {MonacoEditor, Pre} from '@atoms';

import {MainContext} from '@contexts';

import useCRD from '@hooks/useCRD';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import DefinitionSkeleton from './DefinitionSkeleton';

type DefinitionProps = {
  useGetDefinitionQuery: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useUpdateDefinitionMutation: UseMutation<MutationDefinition<any, any, any, any, any>>;
  setEntity?: (data: any) => void;
  name: string;
  label: string;
  crdUrl: string;
};

const DefinitionMonaco: React.FC<PropsWithChildren<DefinitionProps>> = props => {
  const {name, setEntity, useGetDefinitionQuery, useUpdateDefinitionMutation, crdUrl, label} = props;

  const {isClusterAvailable} = useContext(MainContext);

  const {crd, loading: isCRDLoading} = useCRD(crdUrl);

  const [value, setValue] = useState('');
  const [wasTouched, setWasTouched] = useState(false);

  const [update] = useUpdateDefinitionMutation();
  const {
    data: definition = '',
    isLoading: isDefinitionLoading,
    refetch,
  } = useGetDefinitionQuery(name, {
    skip: !isClusterAvailable,
  });

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setValue(definition);
  }, [definition]);

  useEffect(() => {
    if (!crd) {
      return;
    }
    import('monaco-yaml').then(monacoYaml => {
      monacoYaml.setDiagnosticsOptions({
        hover: true,
        validate: true,
        completion: true,
        format: true,
        isKubernetes: true,
        enableSchemaRequest: false,

        schemas: crd?.spec.versions.map((version: any) => ({
          uri: crdUrl,
          fileMatch: ['*'],
          schema: version.schema.openAPIV3Schema as JSONSchema4,
        })),
      });
    });
  }, [crd]);

  const onSave = async () => {
    const monaco = await import('react-monaco-editor').then(editor => editor.monaco);
    const errors = monaco.editor.getModelMarkers({owner: 'yaml'});

    if (errors.length > 0) {
      const errorMessages = {
        errors: errors.map(x => {
          return {
            title: `Line ${x.startLineNumber}:${x.endColumn} ${x.message}`,
          };
        }),
      };
      throw errorMessages;
    }

    return update({name, value})
      .then(res => displayDefaultNotificationFlow(res))
      .then(res => {
        if (res && 'data' in res) {
          notificationCall('passed', `${uppercaseFirstSymbol(label)} was successfully updated.`);
          setEntity?.(res.data);
        }
      });
  };

  return (
    <Form name="definition-form">
      <ConfigurationCard
        title="Definition"
        description={`Validate and update your ${label} configuration`}
        onConfirm={onSave}
        isButtonsDisabled={!wasTouched}
        forceEnableButtons={wasTouched}
      >
        {isCRDLoading || isDefinitionLoading ? (
          <DefinitionSkeleton />
        ) : definition ? (
          <Suspense fallback={<DefinitionSkeleton />}>
            <MonacoEditor
              language="yaml"
              value={value}
              onChange={x => {
                setValue(x);
                setWasTouched(true);
              }}
            />
          </Suspense>
        ) : (
          <Pre> No definition data</Pre>
        )}
      </ConfigurationCard>
    </Form>
  );
};

export default DefinitionMonaco;
