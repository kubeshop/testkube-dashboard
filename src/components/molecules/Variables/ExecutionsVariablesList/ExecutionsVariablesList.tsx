import {memo, useEffect, useState} from 'react';

import {Popover} from 'antd';

import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';

import {Variable} from '@models/variable';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {VariablesListContainer} from './ExecutionsVariablesList.styled';

type ExecutionsVariablesListProps = {
  variables: Variable[];
};

const ExecutionsVariablesList: React.FC<ExecutionsVariablesListProps> = props => {
  const {variables} = props;

  const [secretValuesVisibility, setSecretValuesVisibility] = useState(Array(variables.length).fill(false));

  const textColor = Colors.slate400;

  useEffect(() => {
    setSecretValuesVisibility(Array(variables.length).fill(false));
  }, [variables]);

  return (
    <VariablesListContainer>
      <Text>Key</Text>
      <Text>Value</Text>
      {variables.map((item, index) => {
        return (
          <>
            <Popover content={item.key} placement="topLeft">
              <Text ellipsis color={textColor}>
                {item.key}
              </Text>
            </Popover>
            {item.type === 0 ? (
              <Popover content={item.value} placement="topLeft">
                <Text ellipsis color={textColor}>
                  {item.value}
                </Text>
              </Popover>
            ) : secretValuesVisibility[index] ? (
              <div>
                <Popover content={item.value} placement="topLeft" popupVisible={secretValuesVisibility[index]}>
                  <Text ellipsis color={textColor}>
                    {item.value}
                  </Text>
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
              </div>
            ) : (
              <div>
                <Text color={textColor}>&bull;&bull;&bull;&bull;&bull;</Text>
                <EyeOutlined
                  onClick={() =>
                    setSecretValuesVisibility([
                      ...secretValuesVisibility.slice(0, index),
                      true,
                      ...secretValuesVisibility.slice(index + 1),
                    ])
                  }
                />
              </div>
            )}
          </>
        );
      })}
    </VariablesListContainer>
  );
};

const arePropsEqual = (prevProps: ExecutionsVariablesListProps, nextProps: ExecutionsVariablesListProps) => {
  return JSON.stringify(prevProps.variables) === JSON.stringify(nextProps.variables);
};

export default memo(ExecutionsVariablesList, arePropsEqual);
