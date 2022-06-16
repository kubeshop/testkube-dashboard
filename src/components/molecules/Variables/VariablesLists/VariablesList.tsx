import {memo, useEffect} from 'react';

import {Form, Input, Popover, Select} from 'antd';

import {CloseCircleOutlined, EyeInvisibleOutlined, EyeOutlined, QuestionCircleOutlined} from '@ant-design/icons';

import {Variable} from '@models/variable';

import '../Variables.styled';
import {
  Asterisk,
  StyledAddButton,
  StyledButtonsContainer,
  StyledKeyFormItem,
  StyledLabel,
  StyledLablesSpace,
  StyledPopoverContent,
  StyledSaveButton,
  VariablesListContainer,
} from './VariablesLists.styled';

type VariablesListProps = {
  data: Variable[];
  onClickSave: (value: any) => void;
};

const popoverHelpContent = (
  <StyledPopoverContent>If you wish to hide or obfuscate variables, select type Secret.</StyledPopoverContent>
);

const emptyVariableObject: Variable = {
  type: null,
  key: '',
  value: '',
};

const typeOptions = [
  {label: 'Basic', value: 0},
  {label: 'Secret', value: 1},
];

const duplicateKeyMessage = 'Duplicate key.';

const arePropsEqual = (prevProps: VariablesListProps, nextProps: VariablesListProps) => {
  return JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data);
};

const VariablesList: React.FC<VariablesListProps> = props => {
  const {data, onClickSave} = props;

  const [form] = Form.useForm();

  const onFinish = (value: any) => {
    onClickSave(value);
  };

  useEffect(() => {
    form.setFieldsValue({
      'variables-list': data,
    });
  }, [data]);

  return (
    <Form form={form} onFinish={onFinish}>
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
                  <>
                    <Asterisk />
                    {console.log(form.getFieldValue('variables-list'))}
                    Key
                  </>
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
                >
                  <Select options={typeOptions} />
                </Form.Item>
                <StyledKeyFormItem
                  {...restField}
                  name={[name, 'key']}
                  style={{minWidth: '50px', flexBasis: '200px', marginBottom: '0'}}
                  rules={[
                    {required: true, message: 'Required.'},
                    // {
                    //   message: duplicateKeyMessage,
                    //   validator: (_, value) => {
                    //     const variables = form.getFieldValue('variables-list');
                    //     // eslint-disable-next-line no-restricted-syntax
                    //     for (let i in variables) {
                    //       if (value === variables[i].key && Number(i) < Number(key) && Boolean(value)) {
                    //         console.log(key, i);
                    //         // eslint-disable-next-line prefer-promise-reject-errors
                    //         return Promise.reject();
                    //       }
                    //     }
                    //     return Promise.resolve();
                    //   },
                    // },
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
    </Form>
  );
};

export default memo(VariablesList, arePropsEqual);
