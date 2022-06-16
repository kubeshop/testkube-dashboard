import {EyeInvisibleOutlined} from '@ant-design/icons';

import {
  ReadOnlyVariableRow,
  StyledReadOnlyLabel,
  StyledReadOnlyVariableLabel,
  VariablesListContainer,
} from './VariablesLists.styled';

type ExecutionsVariablesListProps = {
  data: any[];
};

const ExecutionsVariablesList: React.FC<ExecutionsVariablesListProps> = props => {
  const {data} = props;

  return (
    <VariablesListContainer>
      <ReadOnlyVariableRow>
        <StyledReadOnlyLabel>Key:</StyledReadOnlyLabel>
        <StyledReadOnlyLabel>Value:</StyledReadOnlyLabel>
      </ReadOnlyVariableRow>
      {data.map(item => (
        <ReadOnlyVariableRow>
          <StyledReadOnlyVariableLabel>{item.key}</StyledReadOnlyVariableLabel>
          {item.type === 'basic' ? (
            <StyledReadOnlyVariableLabel>{item.value}</StyledReadOnlyVariableLabel>
          ) : (
            <StyledReadOnlyVariableLabel>
              &bull;&bull;&bull;&bull;&bull;
              <EyeInvisibleOutlined />
            </StyledReadOnlyVariableLabel>
          )}
        </ReadOnlyVariableRow>
      ))}
    </VariablesListContainer>
  );
};

export default ExecutionsVariablesList;
