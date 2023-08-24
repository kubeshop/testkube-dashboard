import {FC, PropsWithChildren, Suspense, useContext, useEffect, useState} from 'react';

import {MutationDefinition, QueryDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation, UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {JSONSchema4} from 'json-schema';
import {capitalize} from 'lodash';

import {Pre} from '@atoms/Pre';

import {MainContext} from '@contexts/MainContext';

import {FullWidthSpace} from '@custom-antd/FullWidthSpace';

import {useClusterVersionMatch} from '@hooks/useClusterVersionMatch';

import {CardForm} from '@organisms/CardForm';

import {displayDefaultNotificationFlow} from '@utils/notification';

import {DefinitionSkeleton} from './Definition/DefinitionSkeleton';
import {InlineNotification} from './InlineNotification';
import {KubernetesResourceEditor} from './KubernetesResourceEditor';
import {notificationCall} from './Notification';

type DefinitionProps = {
  useGetDefinitionQuery: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useUpdateDefinitionMutation: UseMutation<MutationDefinition<any, any, any, any, any>>;
  onUpdate?: (response: any) => void;
  name: string;
  label: string;
  crdUrl?: string;
  overrideSchema?: (schema: JSONSchema4) => JSONSchema4;
};

export const Definition: FC<PropsWithChildren<DefinitionProps>> = props => {
  const {name, onUpdate, useGetDefinitionQuery, useUpdateDefinitionMutation, crdUrl, label, overrideSchema} = props;

  const {isClusterAvailable} = useContext(MainContext);
  const isSupported = useClusterVersionMatch('>=1.13.0', true);

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

  const onSave = async () => {
    const monaco = await import('react-monaco-editor').then(editor => editor.monaco);
    const markerErrors = monaco.editor.getModelMarkers({owner: 'yaml'});

    if (markerErrors.length > 0) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        errors: markerErrors.map(x => {
          return {
            title: (
              <>
                {x.message}{' '}
                <em>
                  (line {x.startLineNumber}:{x.startColumn})
                </em>
              </>
            ),
          };
        }),
      });
    }

    return update({name, value})
      .then(displayDefaultNotificationFlow)
      .then(res => {
        notificationCall('passed', `${capitalize(label)} was successfully updated.`);
        onUpdate?.(res.data);
        refetch();
      });
  };

  return (
    <FullWidthSpace size={16} direction="vertical">
      {isSupported ? null : (
        <InlineNotification
          type="error"
          title="Your agent needs to be updated"
          description={
            <>
              You are running an older agent on this environment. Update your Testkube installation to use this editor
              and other new features.
            </>
          }
        />
      )}
      <CardForm
        name="definition-form"
        title="Definition"
        description={`Validate and update your ${label} configuration`}
        onConfirm={onSave}
        onCancel={() => {
          setValue(definition);
          setWasTouched(false);
        }}
        readOnly={!isSupported}
        wasTouched={wasTouched}
      >
        {isDefinitionLoading ? (
          <DefinitionSkeleton />
        ) : definition ? (
          <Suspense fallback={<DefinitionSkeleton />}>
            <KubernetesResourceEditor
              value={value}
              disabled={!isSupported}
              onChange={newValue => {
                setValue(newValue);
                setWasTouched(true);
              }}
              crdUrl={crdUrl}
              overrideSchema={overrideSchema}
            />
          </Suspense>
        ) : (
          <Pre> No definition data</Pre>
        )}
      </CardForm>
    </FullWidthSpace>
  );
};
