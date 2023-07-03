import {useEffect} from 'react';

import {JSONSchema4} from 'json-schema';

import {MonacoEditor} from '@atoms';

import useCRD from '@hooks/useCRD';

interface KubernetesResourceEditorProps {
  crdUrl: string;
  value: string;
  onChange: (value: string) => void;
}

const KubernetesResourceEditor: React.FC<KubernetesResourceEditorProps> = props => {
  const {crdUrl, onChange, value} = props;

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
          schema: version.schema.openAPIV3Schema as JSONSchema4,
        })),
      });
    });
  }, [crd]);

  return <MonacoEditor language="yaml" onChange={onChange} value={value} />;
};

export default KubernetesResourceEditor;
