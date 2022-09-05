import {Form, FormInstance, Input} from 'antd';

import {DeleteOutlined} from '@ant-design/icons';

import {Variable} from '@models/variable';

import {Button} from '@custom-antd';

import {validateDuplicateValueByKey} from '@utils';
import {duplicateKeyMessage, required} from '@utils/form';

import {StyledButtonsContainer, StyledKeyFormItem, StyledLablesSpace, VariablesListContainer} from './Arguments.styled';
import {emptyVariableObject} from './utils';

type ArgumentsFormProps = {
  data: Variable[];
  form: FormInstance;
  isSaveable?: boolean;
};

const ArgumentsForm: React.FC<ArgumentsFormProps> = props => {
  const {data, form} = props;

  return (
    <Form.List name="arguments-list" initialValue={data}>
      {(fields, {add, remove}) => (
        <VariablesListContainer>
          {fields.map(({key, name, ...restField}) => (
            <StyledLablesSpace key={key}>
              <StyledKeyFormItem
                {...restField}
                name={[name, 'key']}
                style={{minWidth: '50px', flex: 2, marginBottom: '0'}}
                rules={[
                  required,
                  {
                    message: duplicateKeyMessage,
                    validator: (_, value) => {
                      const args = form.getFieldValue('arguments-list');

                      return validateDuplicateValueByKey(value, args, 'key') ? Promise.reject() : Promise.resolve();
                    },
                  },
                ]}
                $showClearIcon={form.getFieldError(['arguments-list', Number(key), 'key'])[0] === duplicateKeyMessage}
              >
                <Input placeholder="Flag" />
              </StyledKeyFormItem>
              <div style={{display: 'flex', alignItems: 'center', height: 40}}>=</div>
              <Form.Item noStyle shouldUpdate>
                {() => {
                  return (
                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      style={{minWidth: '50px', flex: 2, marginBottom: '0'}}
                    >
                      <Input placeholder="Value" />
                    </Form.Item>
                  );
                }}
              </Form.Item>
              <DeleteOutlined onClick={() => remove(name)} style={{fontSize: '21px', marginTop: '7px'}} />
            </StyledLablesSpace>
          ))}
          <StyledButtonsContainer>
            <Button $customType="secondary" onClick={() => add(emptyVariableObject)}>
              Add a new argument
            </Button>
          </StyledButtonsContainer>
        </VariablesListContainer>
      )}
    </Form.List>
  );
};

export default ArgumentsForm;
