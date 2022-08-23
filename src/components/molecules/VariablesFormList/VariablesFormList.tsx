import {Form, FormInstance, Input, Popover, Select} from 'antd';

import {DeleteOutlined, EyeInvisibleOutlined, EyeOutlined, QuestionCircleOutlined} from '@ant-design/icons';

import {Variable} from '@models/variable';

import {Button} from '@custom-antd';

import {validateDuplicateValueByKey} from '@utils';
import {required} from '@utils/form';

import {duplicateKeyMessage, emptyVariableObject, popoverHelpContent, typeOptions} from './VariablesFormList.constants';
import {
  Asterisk,
  StyledButtonsContainer,
  StyledKeyFormItem,
  StyledLabel,
  StyledLablesSpace,
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
          {fields.length !== 0 ? (
            <StyledLablesSpace noGap>
              <StyledLabel flex="1">
                Type
                <Popover content={popoverHelpContent} placement="topLeft">
                  <QuestionCircleOutlined style={{marginLeft: '5px', fontSize: '14px'}} />
                </Popover>
              </StyledLabel>
              <StyledLabel flex="2">
                <Asterisk />
                Key
              </StyledLabel>
              <StyledLabel flex="2">Value</StyledLabel>
            </StyledLablesSpace>
          ) : null}
          {fields.map(({key, name, ...restField}) => (
            <StyledLablesSpace key={key}>
              <Form.Item
                {...restField}
                name={[name, 'type']}
                style={{minWidth: '50px', flex: 1, marginBottom: '0'}}
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
                <Input allowClear />
              </StyledKeyFormItem>
              <Form.Item noStyle shouldUpdate>
                {() => {
                  return (
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      style={{minWidth: '50px', flex: 2, marginBottom: '0'}}
                    >
                      {form.getFieldValue('variables-list')[name]?.type === 1 ? (
                        <Input.Password
                          iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                        />
                      ) : (
                        <Input />
                      )}
                    </Form.Item>
                  );
                }}
              </Form.Item>
              <DeleteOutlined onClick={() => remove(name)} style={{fontSize: '21px', marginTop: '7px'}} />
            </StyledLablesSpace>
          ))}
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
