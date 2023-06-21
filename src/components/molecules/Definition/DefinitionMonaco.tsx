import React, {PropsWithChildren, Suspense, useEffect} from 'react';
import MonacoEditor from 'react-monaco-editor';

import {JSONSchema4} from 'json-schema';
import {setDiagnosticsOptions} from 'monaco-yaml';

import {Text} from '@custom-antd';

import useCRD from '@hooks/useCRD';

import {DefinitionContainer} from './Definition.styled';

type DefinitionProps = {
  value: string;
  onChange: (value: string) => void;
};

const options = {
  contextmenu: true,
  fontFamily: 'Roboto Mono, Monaco, monospace',
  fontSize: 13,
  lineHeight: 22,
  minimap: {
    enabled: false,
  },
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 18,
  },
  selectOnLineNumbers: true,
  readOnly: false,
  automaticLayout: true,
};

const DefinitionMonaco: React.FC<PropsWithChildren<DefinitionProps>> = props => {
  const {value, onChange} = props;

  const uri =
    'https://raw.githubusercontent.com/kubeshop/testkube-operator/main/config/crd/bases/tests.testkube.io_testtriggers.yaml';
  const {crd, loading} = useCRD(uri);

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

      schemas: crd?.spec.versions.map((version: any) => ({
        uri,
        fileMatch: ['*'],
        schema: version.schema.openAPIV3Schema as JSONSchema4,
      })),
    });
  }, [crd]);

  if (loading) {
    return (
      <DefinitionContainer>
        <Text>Loading</Text>
      </DefinitionContainer>
    );
  }

  return (
    <DefinitionContainer>
      <Suspense fallback={<Text>Loading</Text>}>
        <MonacoEditor
          height="400"
          language="yaml"
          value={value}
          onChange={onChange}
          theme="vs-dark"
          options={options}
        />
      </Suspense>
    </DefinitionContainer>
  );
};

export default DefinitionMonaco;
