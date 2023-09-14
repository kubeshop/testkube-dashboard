import React, {lazy, useEffect, useMemo, useState} from 'react';
import type {EditorDidMount, monaco} from 'react-monaco-editor';
import {useWindowSize} from 'react-use';

import {countLines} from '@molecules/LogOutput/utils';

import Colors from '@styles/Colors';

const MonacoEditor = lazy(() => import('react-monaco-editor'));

type TkMonacoEditorProps = {
  language: string;
  height?: string;
  minHeight?: number;
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};

export const lineHeight = 22;

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

const computeAutoHeight = (value: string | null | undefined, minHeight: number, maxHeight: number): number => {
  if (!value) {
    return defaultEditorHeight;
  }
  const contentHeight = (countLines(value) + 1) * lineHeight;
  return Math.max(minHeight, Math.min(contentHeight, maxHeight));
};

const TkMonacoEditor: React.FC<TkMonacoEditorProps> = props => {
  const {value = '', onChange, language, disabled = false, height, minHeight = defaultEditorHeight} = props;
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const editorOptions = useMemo(() => ({...options, readOnly: disabled}), [disabled]);

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

  const editorMaxHeight = useWindowSize().height * 0.5;
  const editorAutoHeight = useMemo(
    () => computeAutoHeight(value, minHeight, editorMaxHeight),
    [editor, editorMaxHeight]
  );

  useEffect(() => {
    if (editor && !height) {
      const width = editor.getLayoutInfo().width;
      editor.layout({width, height: editorAutoHeight});
    }
  }, [editor, height, editorMaxHeight]);

  return (
    <MonacoEditor
      language={language}
      value={value}
      onChange={onChange}
      theme="testkube-theme"
      options={editorOptions}
      editorDidMount={handleEditorDidMount}
      height={height ?? `${editorAutoHeight}px`}
    />
  );
};

export default TkMonacoEditor;
