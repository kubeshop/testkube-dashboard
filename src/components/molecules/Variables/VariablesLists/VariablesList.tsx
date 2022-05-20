import {Form, Input, Popover, Select} from 'antd';

import {CloseCircleOutlined, EyeInvisibleOutlined, EyeTwoTone, QuestionCircleOutlined} from '@ant-design/icons';

import {Variable} from '@models/variable';

import {StyledAddButton} from '../Variables.styled';
import {
  Asterisk,
  StyledLabel,
  StyledPopoverContent,
  StyledSpace,
  VariablesListContainer,
} from './VariablesLists.styled';

type VariablesListProps = {
  data: Variable[];
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

const VariablesList: React.FC<VariablesListProps> = props => {
  const {data} = props;

  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.List name="variables-list" initialValue={data}>
        {(fields, {add, remove}) => (
          <VariablesListContainer>
            {fields.length !== 0 ? (
              <StyledSpace>
                <StyledLabel width="100px">
                  Type
                  <Popover content={popoverHelpContent} placement="topLeft">
                    <QuestionCircleOutlined style={{marginLeft: '5px', fontSize: '14px'}} />
                  </Popover>
                </StyledLabel>
                <StyledLabel width="200px">
                  <Asterisk />
                  Key
                </StyledLabel>
                <StyledLabel width="250px">Value</StyledLabel>
              </StyledSpace>
            ) : null}
            {fields.map(({key, name, ...restField}) => (
              <StyledSpace
                key={key}
                showClearIcon={form.getFieldError(['variables-list', Number(key), 'key']).length > 0}
              >
                <Form.Item {...restField} name={[name, 'type']} style={{width: '100px', marginBottom: '0'}}>
                  <Select options={typeOptions} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'key']}
                  style={{width: '200px', marginBottom: '0'}}
                  rules={[
                    {required: true, message: 'Required.'},
                    {
                      message: 'Duplicate key.',
                      validator: (_, value) => {
                        const variables = form.getFieldValue('variables-list');
                        // eslint-disable-next-line no-restricted-syntax
                        for (let i in variables) {
                          if (value === variables[i].key && Number(i) < Number(key) && Boolean(value)) {
                            // eslint-disable-next-line prefer-promise-reject-errors
                            return Promise.reject();
                          }
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item {...restField} name={[name, 'value']} style={{width: '250px', marginBottom: '0'}}>
                  {form.getFieldValue('variables-list')[key]?.type === 1 ? (
                    <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                  ) : (
                    <Input />
                  )}
                </Form.Item>
                <CloseCircleOutlined onClick={() => remove(name)} size={21} style={{fontSize: '21px'}} />
              </StyledSpace>
            ))}
            <StyledAddButton onClick={() => add(emptyVariableObject)}>Add Variable</StyledAddButton>
          </VariablesListContainer>
        )}
      </Form.List>
      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
};

export default VariablesList;
