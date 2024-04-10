import {useMemo} from 'react';

import {DeleteOutlined, EyeInvisibleOutlined, EyeOutlined, PauseOutlined, RightOutlined} from '@ant-design/icons';
import {Form, FormInstance, Input, Select} from 'antd';

import {Button, FormIconWrapper, FormRow, FullWidthSpace, Text} from '@custom-antd';

import {VariableInForm} from '@models/variable';

import {Permissions, usePermission} from '@permissions/base';

import {useClusterDetailsPick} from '@store/clusterDetails';

import Colors from '@styles/Colors';

import {validateDuplicateValueByKey} from '@utils';
import {required} from '@utils/form';

import {duplicateKeyMessage, emptyVariableObject, typeOptions} from './VariablesFormList.constants';
import {StyledButtonsContainer, StyledKeyFormItem} from './VariablesFormList.styled';

type VariablesFormListProps = {
  data: VariableInForm[];
  form: FormInstance;
  isSaveable?: boolean;
};

const VariablesFormList: React.FC<VariablesFormListProps> = props => {
  const {data, form} = props;

  const isButtonVisible = usePermission(Permissions.editEntity);

  const {disableSecretCreation} = useClusterDetailsPick('disableSecretCreation');

  const options = useMemo(() => {
    if (disableSecretCreation) {
      return typeOptions.filter(option => option.value !== 1);
    }
    return typeOptions;
  }, [typeOptions]);

  return (
    <Form.List name="variables-list" initialValue={data}>
      {(fields, {add, remove}) => (
        <FullWidthSpace size={20} direction="vertical">
          {fields && fields.length
            ? fields.map(({key, name, ...restField}) => {
                return (
                  <FormRow key={key}>
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      style={{minWidth: 160, maxWidth: 160, flex: 1, marginBottom: '0'}}
                      rules={[required]}
                    >
                      <Select options={options} />
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
                      $showClearIcon={
                        form.getFieldError(['variables-list', Number(key), 'key'])[0] === duplicateKeyMessage
                      }
                    >
                      <Input allowClear placeholder="Your variable name" />
                    </StyledKeyFormItem>
                    <FormIconWrapper>
                      <PauseOutlined style={{transform: 'rotate(90deg)', color: Colors.slate500}} />
                    </FormIconWrapper>
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
                              <FormIconWrapper>
                                <RightOutlined style={{fontSize: 12, color: Colors.slate500}} />
                              </FormIconWrapper>
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
                    {isButtonVisible ? (
                      <FormIconWrapper>
                        <DeleteOutlined onClick={() => remove(name)} style={{fontSize: 21}} />
                      </FormIconWrapper>
                    ) : null}
                  </FormRow>
                );
              })
            : !isButtonVisible && <Text className="regular">No existing variables or secrets in this test.</Text>}
          {isButtonVisible ? (
            <StyledButtonsContainer>
              <Button $customType="secondary" onClick={() => add(emptyVariableObject)}>
                Add a new variable
              </Button>
            </StyledButtonsContainer>
          ) : null}
        </FullWidthSpace>
      )}
    </Form.List>
  );
};

export default VariablesFormList;
