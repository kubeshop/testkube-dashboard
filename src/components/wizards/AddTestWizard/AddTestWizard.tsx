import {ReactElement} from 'react';

import {Form, Input, Radio, Select, Space} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

// import axios from 'axios';
import {Nullable} from '@models/extendTS';

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
import {fileContentFormFields, formStructure, gitRepoFormFields, stringContentFormFields} from './utils';

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
  'git-file': gitRepoFormFields,
  'git-repo': gitRepoFormFields,
  'file-uri': fileContentFormFields,
  string: stringContentFormFields,
};

const AddTestWizard: React.FC<WizardProps> = props => {
  const {wizardTitle, onCancel, onSave, onRun} = props;

  const [form] = Form.useForm<AddTestWizardGitUriFormFields | AddTestWizardFileContentFormFields>();

  const onRunClick = async (values: any) => {
    try {
      const res = 0;
    } catch (err) {
      console.log('err: ', err);
    }
  };

  const onSaveClick = async (values: AddTestWizardGitUriFormFields | AddTestWizardFileContentFormFields) => {
    const {testSource, testType} = values;
    console.log('values: ', values);

    // const requestBody =
    //   testSource === 'git-uri'
    //     ? {
    //         branch: 'dasdasd',
    //         gitUri: 'dasdas',
    //         personalAccessToken: 'asdsa',
    //         repository: 'asdasd',
    //         name: 'asdasdsa',
    //         testSource: 'git-dir',
    //         type: 'k6',
    //         content: {
    //           type: 'git-uri',
    //         },
    //       }
    //     : {
    //         file: {
    //           fileContent:
    //             'AWSAccessKeyId=AKIA3N6VQVTPBEEUFJVN\r\nAWSSecretKey=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',
    //           fileName: 'rootkey.csv',
    //         },
    //         testSource: 'file',
    //         type: 'k6',
    //       };
    // {
    //   "name": "string",
    //   "namespace": "string",
    //   "type": "string",
    //   "content": {
    //     "type": "string",
    //     "repository": {
    //       "type": "git",
    //       "uri": "string",
    //       "branch": "string",
    //       "path": "string",
    //       "username": "string",
    //       "token": "string"
    //     },
    //     "data": "string",
    //     "uri": "string"
    //   },
    //   "created": "2022-05-11T10:22:08.541Z",
    //   "labels": {
    //     "env": "prod",
    //     "app": "backend"
    //   },
    //   "schedule": "string",
    //   "params": {
    //     "users": "3",
    //     "prefix": "some-"
    //   }
    // }

    try {
      // const res = await axios('/tests', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: JSON.stringify({
      //     namespace: 'testkube',
      //   }),
      // });
      // return res;
    } catch (err) {
      console.log('err: ', err);
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
          }
        }
      };

      // @ts-ignore
      readFile.readAsText(file.file);

      form.validateFields(['file']);
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
        children = <TextArea rows={8} />;
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
          >
            {renderFormItems(formStructure)}
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) => prevValues.testSource !== currentValues.testSource}
            >
              {({getFieldValue}) => {
                const testSourceValue = getFieldValue('testSource');

                if (testSourceValue) {
                  return renderFormItems(additionalFields[testSourceValue]);
                }
              }}
            </Form.Item>
          </Form>
        </StyledWizardForm>
        <WizardHint />
      </StyledWizardBody>
      <StyledWizardFooter>
        <Space>
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            Save
          </Button>
          {/* <Button type="primary">Save & Run</Button> */}
        </Space>
      </StyledWizardFooter>
    </StyledWizardContainer>
  );
};

export default AddTestWizard;
