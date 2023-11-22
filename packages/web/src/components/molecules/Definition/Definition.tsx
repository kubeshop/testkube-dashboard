import React, {PropsWithChildren, Suspense, useEffect, useState} from 'react';

import {MutationDefinition, QueryDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation, UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {JSONSchema4} from 'json-schema';
import {capitalize} from 'lodash';

import {Pre} from '@atoms';

import {FullWidthSpace} from '@custom-antd';

import useClusterVersionMatch from '@hooks/useClusterVersionMatch';
import {useLastCallback} from '@hooks/useLastCallback';
import {SystemAccess, useSystemAccess} from '@hooks/useSystemAccess';

import {InlineNotification, notificationCall} from '@molecules';

import {CardForm} from '@organisms';

import {safeRefetch} from '@utils/fetchUtils';
import {displayDefaultNotificationFlow} from '@utils/notification';

import KubernetesResourceEditor from '../KubernetesResourceEditor';

import DefinitionSkeleton from './DefinitionSkeleton';

type DefinitionProps = {
  useGetDefinitionQuery: UseQuery<QueryDefinition<any, any, any, any, any>>;
  useUpdateDefinitionMutation: UseMutation<MutationDefinition<any, any, any, any, any>>;
  onUpdate?: (response: any) => void;
  name: string;
  label: string;
  crdUrl?: string;
  overrideSchema?: (schema: JSONSchema4) => JSONSchema4;
  readPermissions?: SystemAccess;
  readOnly?: boolean;
};

const Definition: React.FC<PropsWithChildren<DefinitionProps>> = props => {
  const {
    name,
    onUpdate,
    useGetDefinitionQuery,
    useUpdateDefinitionMutation,
    crdUrl,
    label,
    overrideSchema,
    readPermissions = SystemAccess.agent,
    readOnly = false,
  } = props;

  const isReadable = useSystemAccess(readPermissions);
  const isSupported = useClusterVersionMatch('>=1.13.0', true);

  const [value, setValue] = useState('');
  const [wasTouched, setWasTouched] = useState(false);

  const [update] = useUpdateDefinitionMutation();
  const {
    data: definition = '',
    isLoading: isDefinitionLoading,
    refetch,
  } = useGetDefinitionQuery(name, {
    skip: !isReadable,
  });

  const resetValue = useLastCallback(() => {
    setValue(definition);
    setWasTouched(false);
  });

  useEffect(() => {
    safeRefetch(refetch);
  }, []);

  useEffect(resetValue, [definition]);

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
        safeRefetch(refetch);
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
        onCancel={resetValue}
        readOnly={!isSupported || readOnly}
        wasTouched={wasTouched}
      >
        {isDefinitionLoading ? (
          <DefinitionSkeleton />
        ) : definition ? (
          <Suspense fallback={<DefinitionSkeleton />}>
            <KubernetesResourceEditor
              value={value}
              disabled={!isSupported || readOnly}
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

export default Definition;
