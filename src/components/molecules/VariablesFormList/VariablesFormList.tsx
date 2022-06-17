import {Form, FormInstance, Input, Popover, Select} from 'antd';

import {CloseCircleOutlined, EyeInvisibleOutlined, EyeOutlined, QuestionCircleOutlined} from '@ant-design/icons';

import {Variable} from '@models/variable';

import {validateDuplicateValueByKey} from '@utils';

import {duplicateKeyMessage, emptyVariableObject, popoverHelpContent, typeOptions} from './VariablesFormList.constants';
import {
  Asterisk,
  StyledAddButton,
  StyledButtonsContainer,
  StyledKeyFormItem,
  StyledLabel,
  StyledLablesSpace,
  StyledSaveButton,
  VariablesListContainer,
} from './VariablesFormList.styled';

type VariablesFormListProps = {
  data: Variable[];
  form: FormInstance;
};

const VariablesFormList: React.FC<VariablesFormListProps> = props => {
  const {data, form} = props;
  return (
    <Form.List name="variables-list" initialValue={data}>
      {(fields, {add, remove}) => (
        <VariablesListContainer>
          {fields.length !== 0 ? (
            <StyledLablesSpace>
              <StyledLabel basis="100px">
                Type
                <Popover content={popoverHelpContent} placement="topLeft">
                  <QuestionCircleOutlined style={{marginLeft: '5px', fontSize: '14px'}} />
                </Popover>
              </StyledLabel>
              <StyledLabel basis="200px">
                <Asterisk />
                Key
              </StyledLabel>
              <StyledLabel basis="250px">Value</StyledLabel>
            </StyledLablesSpace>
          ) : null}
          {fields.map(({key, name, ...restField}) => (
            <StyledLablesSpace key={key}>
              <Form.Item
                {...restField}
                name={[name, 'type']}
                style={{minWidth: '50px', flexBasis: '100px', marginBottom: '0'}}
                rules={[{required: true, message: 'Required.'}]}
              >
                <Select options={typeOptions} />
              </Form.Item>
              <StyledKeyFormItem
                {...restField}
                name={[name, 'key']}
                style={{minWidth: '50px', flexBasis: '200px', marginBottom: '0'}}
                rules={[
                  {required: true, message: 'Required.'},
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
                showClearIcon={form.getFieldError(['variables-list', Number(key), 'key'])[0] === duplicateKeyMessage}
              >
                <Input allowClear />
              </StyledKeyFormItem>
              <Form.Item
                {...restField}
                name={[name, 'value']}
                style={{minWidth: '50px', flexBasis: '250px', marginBottom: '0'}}
              >
                {form.getFieldValue('variables-list')[key]?.type === 1 ? (
                  <Input.Password iconRender={visible => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)} />
                ) : (
                  <Input />
                )}
              </Form.Item>
              <CloseCircleOutlined onClick={() => remove(name)} size={21} style={{fontSize: '21px'}} />
            </StyledLablesSpace>
          ))}
          <StyledButtonsContainer>
            <StyledAddButton onClick={() => add(emptyVariableObject)}>Add Variable</StyledAddButton>
            {fields.length > 0 ? (
              <Form.Item>
                <StyledSaveButton
                  type="primary"
                  onClick={() => {
                    form.submit();
                  }}
                >
                  Save
                </StyledSaveButton>
              </Form.Item>
            ) : null}
          </StyledButtonsContainer>
        </VariablesListContainer>
      )}
    </Form.List>
  );
};

export default VariablesFormList;
