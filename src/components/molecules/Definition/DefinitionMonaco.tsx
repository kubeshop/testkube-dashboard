import React, {PropsWithChildren, Suspense, useEffect, useState} from 'react';
import MonacoEditor, {EditorDidMount} from 'react-monaco-editor';

import {JSONSchema4} from 'json-schema';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import {setDiagnosticsOptions} from 'monaco-yaml';

import useCRD from '@hooks/useCRD';

import Colors from '@styles/Colors';

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
      // return;
    }
    // setDiagnosticsOptions({
    //   hover: true,
    //   validate: true,
    //   completion: true,
    //   format: true,
    //   isKubernetes: true,

    //   schemas: crd?.spec.versions.map((version: any) => ({
    //     crdUrl,
    //     fileMatch: ['*'],
    //     schema: version.schema.openAPIV3Schema as JSONSchema4,
    //   })),
    // });
  }, [crd]);

  return (
    <DefinitionContainer>
      {isCRDLoading || isDefinitionLoading ? (
        <DefinitionSkeleton lineHeight={lineHeight} />
      ) : (
        <Suspense fallback={<DefinitionSkeleton lineHeight={lineHeight} />}>
          <MonacoEditor
            language="yaml"
            value={value}
            onChange={onChange}
            theme="testkube-theme"
            options={options}
            editorDidMount={handleEditorDidMount}
          />
        </Suspense>
      )}
    </DefinitionContainer>
  );
};

export default DefinitionMonaco;
