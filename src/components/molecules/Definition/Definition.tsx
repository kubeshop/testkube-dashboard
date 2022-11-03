import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

import {CopyButton, TestkubeCodeTheme} from '@atoms';

import {DefinitionContainer} from './Definition.styled';

type DefinitionProps = {
  content: string;
};

const Definition: React.FC<DefinitionProps> = props => {
  const {content} = props;

  return (
    <DefinitionContainer>
      <CopyButton content={content} />
      <SyntaxHighlighter language="yaml" style={TestkubeCodeTheme}>
        {content}
      </SyntaxHighlighter>
    </DefinitionContainer>
  );
};

export default Definition;
