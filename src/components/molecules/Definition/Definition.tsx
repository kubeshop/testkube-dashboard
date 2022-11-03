import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

import {Popover} from 'antd';

import {DefinitionContainer, StyledCopyOutlined} from './Definition.styled';
import testkubeTheme from './TestkubeTheme';

type DefinitionProps = {
  content: string;
};

const Definition: React.FC<DefinitionProps> = props => {
  const {content} = props;
  return (
    <DefinitionContainer>
      <Popover content="copy" trigger="click">
        <StyledCopyOutlined />
      </Popover>
      <SyntaxHighlighter language="yaml" style={testkubeTheme}>
        {content}
      </SyntaxHighlighter>
    </DefinitionContainer>
  );
};

export default Definition;
