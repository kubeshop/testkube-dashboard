import React, {ReactNode} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

import { TestkubeCodeTheme} from '@atoms';

import {DefinitionContainer} from './Definition.styled';

type DefinitionProps = {
  content: string;
  children?: ReactNode;
};

const Definition: React.FC<DefinitionProps> = props => {
  const {content, children} = props;

  return (
    <DefinitionContainer>
      {children}
      <SyntaxHighlighter language="yaml" style={TestkubeCodeTheme}>
        {content}
      </SyntaxHighlighter>
    </DefinitionContainer>
  );
};

export default Definition;
