import {FC, useEffect} from 'react';

import {JSONSchema4} from 'json-schema';

import {TkMonacoEditor as MonacoEditor} from '@atoms/MonacoEditor';

import {useCRD} from '@hooks/useCRD';

interface KubernetesResourceEditorProps {
  disabled?: boolean;
  crdUrl?: string;
  value: string;
  onChange: (value: string) => void;
  overrideSchema?: (schema: JSONSchema4) => JSONSchema4;
}

export const KubernetesResourceEditor: FC<KubernetesResourceEditorProps> = props => {
  const {disabled, crdUrl, onChange, value, overrideSchema = x => x} = props;

  const {crd} = useCRD(crdUrl);

  useEffect(() => {
    import('monaco-yaml').then(monacoYaml => {
      monacoYaml.setDiagnosticsOptions({
        hover: true,
        validate: true,
        completion: true,
        format: true,
        isKubernetes: true,
        enableSchemaRequest: false,

        schemas:
          crd?.spec.versions.map((version: any) => ({
            uri: crdUrl,
            fileMatch: ['*'],
            schema: overrideSchema(version.schema.openAPIV3Schema),
          })) || [],
      });
    });
  }, [crd]);

  return <MonacoEditor language="yaml" onChange={onChange} value={value} disabled={disabled} />;
};
