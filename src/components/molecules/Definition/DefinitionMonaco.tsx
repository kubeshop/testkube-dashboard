import React, {PropsWithChildren, Suspense, useContext, useEffect, useState} from 'react';
import type {monaco} from 'react-monaco-editor';

import {Form} from 'antd';

import {MutationDefinition, QueryDefinition} from '@reduxjs/toolkit/dist/query';
import {UseMutation, UseQuery} from '@reduxjs/toolkit/dist/query/react/buildHooks';

import {Pre} from '@atoms';

import {MainContext} from '@contexts';

import {ConfigurationCard, notificationCall} from '@molecules';

import {displayDefaultNotificationFlow} from '@utils/notification';
import {uppercaseFirstSymbol} from '@utils/strings';

import KubernetesResourceEditor from '../KubernetesResourceEditor';

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

  const [value, setValue] = useState('');
  const [wasTouched, setWasTouched] = useState(false);
  const [markerErrors, setMarkerErrors] = useState<monaco.editor.IMarker[]>([]);

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
    if (markerErrors.length > 0) {
      const errorMessages = {
        errors: markerErrors.map(x => {
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
        onCancel={() => {
          setValue(definition);
          setWasTouched(false);
        }}
        isButtonsDisabled={!wasTouched}
        forceEnableButtons={wasTouched}
      >
        {isDefinitionLoading ? (
          <DefinitionSkeleton />
        ) : definition ? (
          <Suspense fallback={<DefinitionSkeleton />}>
            <KubernetesResourceEditor
              value={value}
              onChange={(newValue, errors) => {
                setValue(newValue);
                setWasTouched(true);
                setMarkerErrors(errors);
              }}
              crdUrl={crdUrl}
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
