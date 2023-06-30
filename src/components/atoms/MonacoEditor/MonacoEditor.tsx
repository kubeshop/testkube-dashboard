import React, {lazy, useEffect, useState} from 'react';
import type {EditorDidMount, monaco} from 'react-monaco-editor';

import Colors from '@styles/Colors';

const MonacoEditor = lazy(() => import('react-monaco-editor'));

type TkMonacoEditorProps = {
  language: string;
  height?: string;
  value: string;
  onChange: (value: string) => void;
};

const lineHeight = 22;

const options = {
  contextmenu: true,
  fontFamily: 'Roboto Mono, Monaco, monospace',
  fontSize: 13,
  lineHeight,
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
  padding: {
    top: 12,
    bottom: 12,
  },
};

const defaultEditorHeight = 300;
const editorMaxHeight = window.screen.height * 0.5;

const TkMonacoEditor: React.FC<TkMonacoEditorProps> = props => {
  const {value, onChange, language, height} = props;
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: EditorDidMount = (mountedEditor, monaco) => {
    monaco.editor.defineTheme('testkube-theme', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        {token: 'type', foreground: Colors.amber400},
        {token: 'delimiter', foreground: Colors.slate50},
        {token: 'string.yaml', foreground: Colors.lime400},
        {token: 'number', foreground: Colors.rose400},
      ],
      colors: {
        'editor.background': Colors.slate800,
        'editor.selectionBackground': Colors.indigo400,
        'editor.lineHighlightBackground': Colors.slate600,
      },
    });
    setEditor(mountedEditor);
  };

  useEffect(() => {
    // if height is set, don't calculate it dynamically
    if (editor && !height) {
      const model = editor.getModel();

      // if default value is empty, display a default height
      if (!model || !model.getValue()) {
        editor.layout({width: editor.getLayoutInfo().width, height: defaultEditorHeight});
        return;
      }

      // add 1 line for better view
      const contentHeight = (model.getLineCount() + 1) * lineHeight;

      editor.layout({
        width: editor.getLayoutInfo().width,
        height: contentHeight > editorMaxHeight ? editorMaxHeight : contentHeight,
      });
    }
  }, [editor, height]);

  return (
    <MonacoEditor
      language={language}
      value={value}
      onChange={onChange}
      theme="testkube-theme"
      options={options}
      editorDidMount={handleEditorDidMount}
      height={height}
    />
  );
};

export default TkMonacoEditor;
