import React, {PropsWithChildren} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

import {TestkubeCodeTheme} from '@atoms';

import {DefinitionContainer} from './Definition.styled';

type DefinitionProps = {
  content: string;
};

const Definition: React.FC<PropsWithChildren<DefinitionProps>> = props => {
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
