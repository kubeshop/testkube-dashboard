import {Form, FormInstance} from 'antd';

import {DeleteOutlined} from '@ant-design/icons';

import {Button, Input} from '@custom-antd';

import {SourcesFormFields} from '@pages/Sources/Sources';

import {k8sResourceNameMaxLength, k8sResourceNamePattern, required} from '@utils/form';

import {ButtonsContainer, FormSpace, SourcesListContainer, SymbolWrapper} from './SourcesFormList.styled';
import {emptySourceObject} from './utils';

type VariablesFormListProps = {
  initialValues: any[];
  form: FormInstance<SourcesFormFields>;
  onSaveForm: any;
  onChange: any;
};

const SourcesFormList: React.FC<VariablesFormListProps> = props => {
  const {form, initialValues, onSaveForm, onChange} = props;

  return (
    <Form name="sourcesForm" form={form} onFinish={onSaveForm} onChange={onChange} onFieldsChange={onChange}>
      <Form.List name="sourcesFormList" initialValue={initialValues}>
        {(fields, {add, remove}) => {
          return (
            <SourcesListContainer>
              {fields.map(({key, name, ...rest}) => {
                return (
                  <FormSpace key={key}>
                    <Form.Item
                      {...rest}
                      name={[name, 'name']}
                      style={{flex: 1, marginBottom: '0'}}
                      rules={[required, k8sResourceNamePattern, k8sResourceNameMaxLength]}
                    >
                      <Input placeholder="Name your source" />
                    </Form.Item>
                    <Form.Item {...rest} name={[name, 'username']} style={{flex: 1, marginBottom: '0'}}>
                      <Input placeholder="Git username" />
                    </Form.Item>
                    <Form.Item {...rest} name={[name, 'token']} style={{flex: 1, marginBottom: '0'}}>
                      <Input placeholder="Git token reference name" />
                    </Form.Item>
                    <Form.Item {...rest} name={[name, 'uri']} style={{flex: 1, marginBottom: '0'}} rules={[required]}>
                      <Input placeholder="Repository" />
                    </Form.Item>
                    <SymbolWrapper>
                      <DeleteOutlined onClick={() => remove(name)} style={{fontSize: 21}} />
                    </SymbolWrapper>
                  </FormSpace>
                );
              })}
              <ButtonsContainer>
                <Button $customType="secondary" onClick={() => add(emptySourceObject)}>
                  Add another source
                </Button>
              </ButtonsContainer>
            </SourcesListContainer>
          );
        }}
      </Form.List>
    </Form>
  );
};

export default SourcesFormList;
