import {memo, useEffect, useState} from 'react';

import {Popover} from 'antd';

import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';

import {Variable} from '@models/variable';

import {
  ReadOnlyVariableRow,
  StyledReadOnlyLabel,
  StyledReadOnlyVariableLabel,
  StyledText,
  VariablesListContainer,
} from './ExecutionsVariablesList.styled';

type ExecutionsVariablesListProps = {
  data: Variable[];
};

const ExecutionsVariablesList: React.FC<ExecutionsVariablesListProps> = props => {
  const {data} = props;

  const [secretValuesVisibility, setSecretValuesVisibility] = useState(Array(data.length).fill(false));

  useEffect(() => {
    setSecretValuesVisibility(Array(data.length).fill(false));
  }, [data]);

  return (
    <VariablesListContainer>
      <ReadOnlyVariableRow>
        <StyledReadOnlyLabel>Key:</StyledReadOnlyLabel>
        <StyledReadOnlyLabel>Value:</StyledReadOnlyLabel>
      </ReadOnlyVariableRow>
      {data.map((item, index) => (
        <ReadOnlyVariableRow>
          <StyledReadOnlyVariableLabel>
            <Popover content={item.key} placement="top" arrowPointAtCenter>
              <StyledText>{item.key}</StyledText>
            </Popover>
          </StyledReadOnlyVariableLabel>
          {item.type === 0 ? (
            <StyledReadOnlyVariableLabel>
              <Popover content={item.value} placement="topLeft" arrowPointAtCenter>
                <StyledText>{item.value}</StyledText>
              </Popover>
            </StyledReadOnlyVariableLabel>
          ) : (
            <StyledReadOnlyVariableLabel>
              {secretValuesVisibility[index] ? (
                <>
                  <Popover content={item.value} placement="topLeft" arrowPointAtCenter>
                    <StyledText>{item.value}</StyledText>
                  </Popover>
                  <EyeInvisibleOutlined
                    onClick={() =>
                      setSecretValuesVisibility([
                        ...secretValuesVisibility.slice(0, index),
                        false,
                        ...secretValuesVisibility.slice(index + 1),
                      ])
                    }
                  />
                </>
              ) : (
                <>
                  &bull;&bull;&bull;&bull;&bull;
                  <EyeOutlined
                    onClick={() =>
                      setSecretValuesVisibility([
                        ...secretValuesVisibility.slice(0, index),
                        true,
                        ...secretValuesVisibility.slice(index + 1),
                      ])
                    }
                  />
                </>
              )}
            </StyledReadOnlyVariableLabel>
          )}
        </ReadOnlyVariableRow>
      ))}
    </VariablesListContainer>
  );
};

const arePropsEqual = (prevProps: ExecutionsVariablesListProps, nextProps: ExecutionsVariablesListProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
};

export default memo(ExecutionsVariablesList, arePropsEqual);
