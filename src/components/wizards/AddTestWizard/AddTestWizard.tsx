/* eslint-disable unused-imports/no-unused-imports-ts */
import {useContext, useEffect, useMemo, useState} from 'react';

import {Form, Input, Popover, Select, Space, notification} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import {
  ArrowLeftOutlined,
  CloseCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import {Nullable} from '@models/extendTS';
import {WizardComponentProps} from '@models/wizard';

import {setRedirectTarget} from '@redux/reducers/configSlice';

import {Button, Step, Steps} from '@custom-antd';

import {useAddTestMutation} from '@services/tests';

import {MainContext} from '@contexts';

import VariablesFormList from '@src/components/molecules/VariablesFormList';
import {
  duplicateKeyMessage,
  emptyVariableObject,
  popoverHelpContent,
  typeOptions,
} from '@src/components/molecules/VariablesFormList/VariablesFormList.constants';
import {
  Asterisk,
  StyledAddButton,
  StyledButtonsContainer,
  StyledKeyFormItem,
  StyledLabel,
  StyledLablesSpace,
  VariablesListContainer,
} from '@src/components/molecules/VariablesFormList/VariablesFormList.styled';
import {validateDuplicateValueByKey} from '@src/utils';
import {required} from '@src/utils/form';
import {formatVariables} from '@src/utils/variables';

import {
  StyledWizardBody,
  StyledWizardContainer,
  StyledWizardFooter,
  StyledWizardForm,
  StyledWizardParagraph,
} from '../Wizard.styled';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import WizardHint from './WizardHint';
import {addTestHints, addTestSteps, getTestSourceSpecificFields, optionalFields} from './utils';

const AddTestWizard: React.FC<WizardComponentProps> = props => {
  const {onCancel} = props;

  const {dispatch, navigate} = useContext(MainContext);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(0);

  const [addTest] = useAddTestMutation();

  const [form] = Form.useForm();

  const onRunClick = async () => {
    const values = form.getFieldsValue(true);

    try {
      const targetTestName = await onSaveClick(values, true);

      if (targetTestName) {
        dispatch(setRedirectTarget({targetTestId: targetTestName, runTarget: true}));

        navigate('/dashboard/tests');
      }
    } catch (err) {
      console.log('err: ', err);
    }
  };

  const onSaveClick = async (values: any, toRun: boolean = false) => {
    setIsLoading(true);

    const {testSource, testType} = values;

    const testSourceSpecificFields = getTestSourceSpecificFields(values);

    const requestBody = {
      name: values.name,
      type: testType,
      content: {
        type: testSource === 'file-uri' ? 'string' : testSource,
        ...testSourceSpecificFields,
      },
      variables: formatVariables(values['variables-list']),
    };

    return addTest(requestBody)
      .then((res: any) => {
        if (res.error) {
          const errorTitle = res.error?.data.title || 'Unknown error';
          const errorDetails = res.error?.data.detail || 'Something went wrong';
          const errorStatus = res.error?.status;

          notification.error({
            message: errorTitle,
            description: (
              <span>
                Status: {errorStatus}
                <br />
                Details: {errorDetails}
              </span>
            ),
            duration: 0,
          });
        } else {
          const targetTestName = res?.data?.metadata?.name;

          if (!toRun) {
            dispatch(setRedirectTarget({targetTestId: targetTestName}));

            return navigate('/dashboard/tests');
          }

          return targetTestName;
        }
      })
      .catch(err => {
        if (err instanceof Error) {
          notification.error({
            message: 'Unknown error',
            description: String(err) || 'Something went wrong',
            duration: 0,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onFinish = () => {
    if (current !== 2) {
      return setCurrent(prev => prev + 1);
    }

    const values = form.getFieldsValue(true);

    return onSaveClick(values);
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

      // @ts-ignore
      readFile.readAsText(file.file);
    }
  };

  // const onFieldsChange = () => {
  //   const formFields = form.getFieldsValue();
  //   const formFieldsKeys = Object.keys(formFields);

  //   if (formFieldsKeys.length === 1 && !formFields[formFieldsKeys[0]].length) {
  //     return setButtonDisabled(true);
  //   }

  //   setButtonDisabled(false);
  // };

  const formSteps: any = {
    0: <FirstStep onFileChange={onFileChange} />,
    1: <SecondStep form={form} />,
    2: <ThirdStep form={form} />,
  };

  const renderedHeaderSteps = useMemo(() => {
    return addTestSteps.map(step => {
      const {title, description} = step;

      return <Step title={title} description={description} />;
    });
  }, []);

  const renderedHints = useMemo(() => {
    return addTestHints.map(Component => {
      return Component;
    });
  }, []);

  // useEffect(() => {
  //   onFieldsChange();
  // }, [current]);

  return (
    <StyledWizardContainer>
      <Steps current={current}>{renderedHeaderSteps}</Steps>
      <StyledWizardBody>
        <StyledWizardForm>
          <Form
            form={form}
            name="add-test-form"
            labelCol={{span: 8}}
            onFinish={onFinish}
            initialValues={{
              branch: 'main',
            }}
            // onFieldsChange={onFieldsChange}
          >
            <StyledWizardParagraph style={{marginBottom: 30}}>
              Create a new test based on file content, string or git based data.
            </StyledWizardParagraph>
            {formSteps[current]}
          </Form>
        </StyledWizardForm>
        {renderedHints[current]}
      </StyledWizardBody>
      <StyledWizardFooter>
        <Space>
          <Button onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="dashed"
            onClick={() => {
              setCurrent(prev => {
                return prev - 1;
              });
            }}
            disabled={current === 0}
            loading={isLoading}
            icon={<ArrowLeftOutlined />}
          >
            Back
          </Button>
          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
            disabled={buttonDisabled}
          >
            {current === 2 ? 'Save' : 'Next'}
          </Button>
          {current === 2 ? (
            <Button
              type="primary"
              onClick={() => {
                onRunClick();
              }}
            >
              Save & Run
            </Button>
          ) : null}
        </Space>
      </StyledWizardFooter>
    </StyledWizardContainer>
  );
};

export default AddTestWizard;
