import React, {PropsWithChildren, Suspense, useEffect} from 'react';

import {JSONSchema4} from 'json-schema';
import {setDiagnosticsOptions} from 'monaco-yaml';

import {MonacoEditor} from '@atoms';

import useCRD from '@hooks/useCRD';

import {DefinitionContainer} from './Definition.styled';
import DefinitionSkeleton from './DefinitionSkeleton';

type DefinitionProps = {
  value: string;
  onChange: (value: string) => void;
  isDefinitionLoading: boolean;
  crdUrl: string;
};

const DefinitionMonaco: React.FC<PropsWithChildren<DefinitionProps>> = props => {
  const {value, onChange, isDefinitionLoading, crdUrl} = props;

  const {crd, loading: isCRDLoading} = useCRD(crdUrl);

  useEffect(() => {
    if (!crd) {
      return;
    }
    setDiagnosticsOptions({
      hover: true,
      validate: true,
      completion: true,
      format: true,
      isKubernetes: true,
      enableSchemaRequest: false,

      schemas: crd?.spec.versions.map((version: any) => ({
        crdUrl,
        fileMatch: ['*'],
        schema: version.schema.openAPIV3Schema as JSONSchema4,
      })),
    });
  }, [crd]);

  return (
    <DefinitionContainer>
      {isCRDLoading || isDefinitionLoading ? (
        <DefinitionSkeleton />
      ) : (
        <Suspense fallback={<DefinitionSkeleton />}>
          <MonacoEditor language="yaml" value={value} onChange={onChange} />
        </Suspense>
      )}
    </DefinitionContainer>
  );
};

export default DefinitionMonaco;
