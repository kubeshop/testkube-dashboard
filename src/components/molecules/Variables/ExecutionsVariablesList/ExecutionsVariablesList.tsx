import {memo, useEffect, useState} from 'react';

import {Popover} from 'antd';

import {Variable} from '@models/variable';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {
  VariableDetailWrapper,
  VariableTypeWrapper,
  VariablesList,
  VariablesListItem,
} from './ExecutionsVariablesList.styled';

type ExecutionsVariablesListProps = {
  variables: Variable[];
};

const ExecutionsVariablesList: React.FC<ExecutionsVariablesListProps> = props => {
  const {variables} = props;

  const [secretValuesVisibility, setSecretValuesVisibility] = useState(Array(variables.length).fill(false));

  const textColor = Colors.whitePure;

  useEffect(() => {
    setSecretValuesVisibility(Array(variables.length).fill(false));
  }, [variables]);

  return (
    <VariablesList>
      {variables.map((item, index) => {
        return (
          <VariablesListItem key={item.key}>
            <VariableTypeWrapper>
              <Text className="uppercase" color={Colors.slate500}>
                {!item.type ? 'Basic' : item.type === 'secretRef' ? 'Secret ref' : 'Secret'}
              </Text>
            </VariableTypeWrapper>
            <Popover content={item.key} placement="topLeft">
              <VariableDetailWrapper>
                <Text className="regular" ellipsis color={textColor}>
                  {item.key}
                </Text>
              </VariableDetailWrapper>
            </Popover>
            {item.type === 0 ? (
              <VariableDetailWrapper>
                <Popover content={item.value} placement="topLeft">
                  <Text className="regular" ellipsis color={textColor}>
                    {item.value}
                  </Text>
                </Popover>
              </VariableDetailWrapper>
            ) : secretValuesVisibility[index] ? (
              <VariableDetailWrapper>
                <Popover content={item.value} placement="topLeft" popupVisible={secretValuesVisibility[index]}>
                  <Text className="regular" ellipsis color={textColor}>
                    {item.value}
                  </Text>
                </Popover>
              </VariableDetailWrapper>
            ) : (
              <VariableDetailWrapper>
                <Text className="regular" color={textColor}>*********</Text>
              </VariableDetailWrapper>
            )}
          </VariablesListItem>
        );
      })}
    </VariablesList>
  );
};

const arePropsEqual = (prevProps: ExecutionsVariablesListProps, nextProps: ExecutionsVariablesListProps) => {
  return JSON.stringify(prevProps.variables) === JSON.stringify(nextProps.variables);
};

export default memo(ExecutionsVariablesList, arePropsEqual);
