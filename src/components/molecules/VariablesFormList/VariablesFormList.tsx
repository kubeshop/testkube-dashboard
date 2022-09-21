import {Form, FormInstance, Input, Select} from 'antd';

import {DeleteOutlined, EyeInvisibleOutlined, EyeOutlined, PauseOutlined, RightOutlined} from '@ant-design/icons';

import {Variable} from '@models/variable';

import {Button} from '@custom-antd';

import {validateDuplicateValueByKey} from '@utils';
import {required} from '@utils/form';

import Colors from '@styles/Colors';

import {duplicateKeyMessage, emptyVariableObject, typeOptions} from './VariablesFormList.constants';
import {
  StyledButtonsContainer,
  StyledKeyFormItem,
  StyledLablesSpace,
  SymbolWrapper,
  VariablesListContainer,
} from './VariablesFormList.styled';

type VariablesFormListProps = {
  data: Variable[];
  form: FormInstance;
  isSaveable?: boolean;
};

const VariablesFormList: React.FC<VariablesFormListProps> = props => {
  const {data, form} = props;

  return (
    <Form.List name="variables-list" initialValue={data}>
      {(fields, {add, remove}) => (
        <VariablesListContainer>
          {fields.map(({key, name, ...restField}) => {
            return (
              <StyledLablesSpace key={key}>
                <Form.Item
                  {...restField}
                  name={[name, 'type']}
                  style={{minWidth: 160, maxWidth: 160, flex: 1, marginBottom: '0'}}
                  rules={[required]}
                >
                  <Select options={typeOptions} />
                </Form.Item>
                <StyledKeyFormItem
                  {...restField}
                  name={[name, 'key']}
                  style={{minWidth: '50px', flex: 2, marginBottom: '0'}}
                  rules={[
                    required,
                    {
                      message: duplicateKeyMessage,
                      validator: (_, value) => {
                        const variables = form.getFieldValue('variables-list');
                        return validateDuplicateValueByKey(value, variables, 'key')
                          ? Promise.reject()
                          : Promise.resolve();
                      },
                    },
                  ]}
                  $showClearIcon={form.getFieldError(['variables-list', Number(key), 'key'])[0] === duplicateKeyMessage}
                >
                  <Input allowClear placeholder="Your variable name" />
                </StyledKeyFormItem>
                <SymbolWrapper>
                  <PauseOutlined style={{transform: 'rotate(90deg)', color: Colors.slate500}} />
                </SymbolWrapper>
                <Form.Item noStyle shouldUpdate>
                  {() => {
                    const neededFieldValue = form.getFieldValue('variables-list');

                    const inputType = neededFieldValue[name]?.type;

                    if (inputType === 'secretRef') {
                      return (
                        <>
                          <Form.Item
                            {...restField}
                            name={[name, 'secretRefName']}
                            style={{minWidth: '50px', flex: 2, marginBottom: '0'}}
                          >
                            <Input placeholder="Referenced secret name" />
                          </Form.Item>
                          <SymbolWrapper>
                            <RightOutlined style={{fontSize: 12}} />
                          </SymbolWrapper>
                          <Form.Item
                            {...restField}
                            name={[name, 'secretRefKey']}
                            style={{minWidth: '50px', flex: 2, marginBottom: '0'}}
                          >
                            <Input placeholder="Referenced secret key" />
                          </Form.Item>
                        </>
                      );
                    }

                    return (
                      <Form.Item
                        {...restField}
                        name={[name, 'value']}
                        style={{minWidth: '50px', flex: 2, marginBottom: '0'}}
                      >
                        {form.getFieldValue('variables-list')[name]?.type === 1 ? (
                          <Input.Password
                            iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                            placeholder="Your variable value"
                          />
                        ) : (
                          <Input placeholder="Your variable value" />
                        )}
                      </Form.Item>
                    );
                  }}
                </Form.Item>
                <SymbolWrapper>
                  <DeleteOutlined onClick={() => remove(name)} style={{fontSize: 21}} />
                </SymbolWrapper>
              </StyledLablesSpace>
            );
          })}
          <StyledButtonsContainer>
            <Button $customType="secondary" onClick={() => add(emptyVariableObject)}>
              Add a new variable
            </Button>
          </StyledButtonsContainer>
        </VariablesListContainer>
      )}
    </Form.List>
  );
};

export default VariablesFormList;
