import React, {PropsWithChildren, Suspense, lazy} from 'react';

import {Text} from '@custom-antd';

import {DefinitionContainer} from './Definition.styled';

type DefinitionProps = {
  content: string;
  monacoRef: any;
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

const Editor = lazy(() => import('@monaco-editor/react'));

const Definition: React.FC<PropsWithChildren<DefinitionProps>> = props => {
  const {content, monacoRef} = props;

  // @ts-ignore
  const handleEditorDidMount = editor => {
    monacoRef.current = editor;
  };

  return (
    <DefinitionContainer>
      <Suspense fallback={<Text>Loading</Text>}>
        <Editor
          height="300px"
          defaultLanguage="yaml"
          defaultValue={content}
          theme="vs-dark"
          options={options}
          onMount={handleEditorDidMount}
        />
      </Suspense>
    </DefinitionContainer>
  );
};

export default Definition;
