import {useContext} from 'react';

import {Form, Select} from 'antd';
import {UploadChangeParam} from 'antd/lib/upload';

import {useAppSelector} from '@redux/hooks';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {ConfigurationCard} from '@molecules';

import {additionalFields} from '@wizards/AddTestWizard/steps/FirstStep';
import {remapTestSources} from '@wizards/AddTestWizard/utils';

import {renderFormItems, required} from '@utils/form';

import {EntityDetailsContext} from '@contexts';

import {StyledFormItem, StyledSpace} from '../Settings.styled';

const Source = () => {
  const {entityDetails} = useContext(EntityDetailsContext);

  const {
    content: {type: source},
  } = entityDetails;

  const [form] = Form.useForm();
  const testSources = useAppSelector(selectSources);

  const remappedCustomTestSources = remapTestSources(testSources);

  const sourcesOptions = [
    ...remappedCustomTestSources,
    {value: 'git-dir', label: 'Git directory'},
    {value: 'git-file', label: 'Git file'},
    {value: 'file-uri', label: 'File'},
    {value: 'string', label: 'String'},
  ];

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

  return (
    <Form form={form} name="test-settings-source" initialValues={{source}}>
      <ConfigurationCard
        title="Source"
        description="Define the source for your test"
        onConfirm={() => {
          form.submit();
        }}
        onCancel={() => {
          form.resetFields();
        }}
        footerText={
          <>
            Learn more about{' '}
            <a
              href="https://kubeshop.github.io/testkube/using-testkube/tests/tests-creating/#test-source"
              target="_blank"
            >
              test sources
            </a>
          </>
        }
      >
        <StyledSpace size={32} direction="vertical" style={{width: '100%'}}>
          <StyledFormItem name="source" rules={[required]} style={{marginBottom: '0px'}}>
            <Select showSearch options={sourcesOptions} />
          </StyledFormItem>
          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.source !== currentValues.source}>
            {({getFieldValue}) => {
              let testSourceValue: string = getFieldValue('source');

              if (testSourceValue) {
                testSourceValue = testSourceValue.includes('custom-git-dir') ? 'custom' : testSourceValue;

                return renderFormItems(additionalFields[testSourceValue], {onFileChange});
              }
            }}
          </Form.Item>
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default Source;
