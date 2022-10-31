import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

import testkubeTheme from './TestkubeTheme';

type DefinitionProps = {
  content: string;
};

const Definition: React.FC<DefinitionProps> = props => {
  const {content} = props;
  return (
    <SyntaxHighlighter language="yaml" style={testkubeTheme}>
      {content}
    </SyntaxHighlighter>
  );
};

export default Definition;
