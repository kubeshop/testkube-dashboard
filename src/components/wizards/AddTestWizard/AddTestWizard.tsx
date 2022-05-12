/* eslint-disable no-unreachable */
import {ReactElement, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Form, Input, Radio, Select, Space} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import axios from 'axios';

import {Nullable} from '@models/extendTS';

import {useAppDispatch} from '@redux/hooks';
import {setRedirectTarget} from '@redux/reducers/configSlice';

import {UploadWithInput} from '@atoms';

import {Button, FormItem} from '@custom-antd';

import {
  StyledWizardBody,
  StyledWizardContainer,
  StyledWizardFooter,
  StyledWizardForm,
  StyledWizardTitle,
} from '../Wizard.styled';
import WizardHint from './WizardHint';
import {
  fileContentFormFields,
  formStructure,
  gitDirFormFields,
  gitFileFormFields,
  stringContentFormFields,
} from './utils';

const {Option} = Select;
const {TextArea} = Input;

type WizardProps = {
  wizardTitle: string;
  onCancel?: () => any;
  onSave?: () => any;
  onRun?: () => any;
};

interface AddTestWizardDefaultFormFields {
  testType: string;
  testSource: string;
}

interface AddTestWizardGitUriFormFields extends AddTestWizardDefaultFormFields {
  token?: string;
  uri: string;
  branch?: string;
  path: string;
  test: string;
}

interface AddTestWizardFileContentFormFields extends AddTestWizardDefaultFormFields {
  file: Nullable<{
    fileName: string;
    fileContent: string;
  }>;
}

const additionalFields: any = {
  'git-dir': gitDirFormFields,
  'git-file': gitFileFormFields,
  'file-uri': fileContentFormFields,
  string: stringContentFormFields,
};

const AddTestWizard: React.FC<WizardProps> = props => {
  const {wizardTitle, onCancel, onSave, onRun} = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm<AddTestWizardGitUriFormFields | AddTestWizardFileContentFormFields>();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onRunClick = async () => {
    const values = form.getFieldsValue();

    try {
      const res = await onSaveClick(values, true);

      const targetRedirectTestData = res?.data?.metadata?.name;

      dispatch(setRedirectTarget({targetTestId: targetRedirectTestData, runTarget: true}));
      navigate('/dashboard/tests');
    } catch (err) {
      console.log('err: ', err);
    }
  };

  const onSaveClick = async (values: any, toRun: boolean = false) => {
    setIsLoading(true);
    const {testSource, testType} = values;

    const neededFields =
      testSource === 'string' || testSource === 'file-uri'
        ? {data: values.string || values.file.fileContent}
        : testSource === 'git-file'
        ? {
            repository: {
              type: testSource,
              uri: values.uri,
              ...(values.token ? {token: values.token} : {}),
            },
          }
        : {
            repository: {
              branch: values.branch,
              type: testSource,
              uri: values.uri,
              ...(values.path ? {path: values.path} : {}),
              ...(values.token ? {token: values.token} : {}),
            },
          };

    const requestBody = {
      name: values.name,
      type: testType,
      content: {
        type: testSource,
        ...neededFields,
      },
    };

    try {
      const res = await axios('/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(requestBody),
      });

      if (res.status === 200) {
        if (!toRun) {
          const targetRedirectTestData = res?.data?.metadata?.name;

          dispatch(setRedirectTarget({targetTestId: targetRedirectTestData}));
          return navigate('/dashboard/tests');
        }

        return res;
      }
    } catch (err) {
      console.log('err: ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = (val: any) => {
    return onSaveClick(val);
  };

  const onFileChange = (file: Nullable<UploadChangeParam>) => {
    if (!file) {
      form.setFieldsValue({
        file: null,
      });
      form.validateFields(['file']);
    } else {
      const readFile = new FileReader();

      readFile.onload = e => {
        if (e && e.target) {
          const fileContent = e.target.result;

          if (fileContent) {
            form.setFieldsValue({
              file: {
                fileContent: fileContent as string,
                fileName: file.file.name,
              },
            });

            form.validateFields(['file']);
          }
        }
      };

      if (file.file.type === 'application/json') {
        // @ts-ignore
        readFile.readAsText(file.file);
      }
    }
  };

  const renderFormItems = (array: any) => {
    return array.map((formItem: any) => {
      const {
        options = null,
        itemLabel,
        tooltip,
        fieldName,
        inputType,
        modificator = null,
        rules = [],
        help = null,
        defaultValue = null,
      } = formItem;

      let children: Nullable<ReactElement<any, any>> = null;

      if (inputType === 'select') {
        children = (
          <Select>
            {options.map((option: any) => {
              return (
                <Option value={option.value} key={option.value}>
                  {option.label}
                </Option>
              );
            })}
          </Select>
        );
      }

      if (inputType === 'radio') {
        children = (
          <Radio.Group>
            {options.map((option: any) => {
              return (
                <Radio value={option.value} key={option.value}>
                  {option.label}
                </Radio>
              );
            })}
          </Radio.Group>
        );
      }

      if (inputType === 'default') {
        if (modificator) {
          if (modificator === 'password') {
            children = <Input.Password />;
          }
        } else {
          children = <Input />;
        }
      }

      if (inputType === 'uploadWithInput') {
        children = <UploadWithInput onFileChange={onFileChange} />;
      }

      if (inputType === 'textarea') {
        children = <TextArea rows={10} style={{resize: 'none', height: '100%'}} />;
      }

      if (!children) {
        return null;
      }

      return (
        <FormItem rules={rules} label={itemLabel} name={fieldName} tooltip={tooltip} key={fieldName} help={help}>
          {children}
        </FormItem>
      );
    });
  };

  const da = ['token', 'branch'];

  return (
    <StyledWizardContainer>
      <StyledWizardTitle>{wizardTitle}</StyledWizardTitle>
      <StyledWizardBody>
        <StyledWizardForm>
          <span>Create a new test based on file content or git based data.</span>
          <Form
            form={form}
            name="add-test-form"
            labelCol={{span: 8}}
            onFinish={onFinish}
            style={{paddingTop: 30}}
            initialValues={{testSource: '', testType: '', branch: 'main'}}
            onFieldsChange={() => {
              const formFields = form.getFieldsValue();

              const isTouched = Object.keys(formFields).every(fieldKey => {
                const isFieldTouched = form.isFieldTouched(fieldKey);
                const fieldValue = form.getFieldValue(fieldKey);
                const isFieldNotRequired = da.includes(fieldKey);

                return isFieldNotRequired || Boolean(fieldValue) || isFieldTouched;
              });

              if (isTouched) {
                return setButtonDisabled(form.getFieldsError().some(field => field.errors.length > 0));
              }

              return setButtonDisabled(true);
            }}
          >
            {renderFormItems(formStructure)}
            <FormItem
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
            >
              {({getFieldValue}) => {
                const testSourceValue = getFieldValue('testSource');

                if (testSourceValue) {
                  return renderFormItems(additionalFields[testSourceValue]);
                }
              }}
            </FormItem>
          </Form>
        </StyledWizardForm>
        <WizardHint />
      </StyledWizardBody>
      <StyledWizardFooter>
        <Space>
          <Button onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
            disabled={buttonDisabled}
            loading={isLoading}
          >
            Save
          </Button>
          <Button type="primary" onClick={onRunClick} disabled={buttonDisabled}>
            Save & Run
          </Button>
        </Space>
      </StyledWizardFooter>
    </StyledWizardContainer>
  );
};

export default AddTestWizard;
