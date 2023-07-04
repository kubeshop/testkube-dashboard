import {FC, useEffect} from 'react';

import {JSONSchema4} from 'json-schema';

import {MonacoEditor} from '@atoms';

import useCRD from '@hooks/useCRD';

interface KubernetesResourceEditorProps {
  crdUrl?: string;
  value: string;
  onChange: (value: string) => void;
  overrideSchema?: (schema: JSONSchema4) => JSONSchema4;
}

const KubernetesResourceEditor: FC<KubernetesResourceEditorProps> = props => {
  const {crdUrl, onChange, value, overrideSchema = x => x} = props;

  const {crd} = useCRD(crdUrl);

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
          schema: overrideSchema(version.schema.openAPIV3Schema),
        })),
      });
    });
  }, [crd]);

  return <MonacoEditor language="yaml" onChange={onChange} value={value} />;
};

export default KubernetesResourceEditor;
