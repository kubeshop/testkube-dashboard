import {useContext} from 'react';

import {Form, Select} from 'antd';

import {useAppSelector} from '@redux/hooks';
import {selectSources} from '@redux/reducers/sourcesSlice';

import {ConfigurationCard} from '@molecules';

import {additionalFields} from '@wizards/AddTestWizard/steps/FirstStep';
import {onFileChange, remapTestSources} from '@wizards/AddTestWizard/utils';

import {renderFormItems, required} from '@utils/form';

import {EntityDetailsContext} from '@contexts';

import {StyledFormItem, StyledSpace} from '../Settings.styled';

const Source = () => {
  const {entityDetails} = useContext(EntityDetailsContext);

  const testSources = useAppSelector(selectSources);

  const remappedCustomTestSources = remapTestSources(testSources);

  const getFormValues = () => {
    const {content} = entityDetails;

    if (!content.type) {
      const sourceDetails = testSources.find(source => source.name === entityDetails.source);

      return {
        source: entityDetails.source,
        branch: sourceDetails?.repository.branch,
        path: sourceDetails?.repository.path,
      };
    }

    if (content.type === 'string') {
      return {
        source: content.type,
        string: content.data,
      };
    }

    return {
      source: content.type,
      ...content.repository,
    };
  };

  const {source, ...additionalFormValues} = getFormValues();

  const [form] = Form.useForm();

  const sourcesOptions = [
    ...remappedCustomTestSources,
    {value: 'git-dir', label: 'Git directory'},
    {value: 'git-file', label: 'Git file'},
    {value: 'file-uri', label: 'File'},
    {value: 'string', label: 'String'},
  ];

  return (
    <Form
      form={form}
      name="test-settings-source"
      initialValues={{source, ...additionalFormValues}}
      layout="vertical"
      labelAlign="right"
    >
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
        <StyledSpace size={24} direction="vertical">
          <StyledFormItem name="source" rules={[required]}>
            <Select showSearch options={sourcesOptions} />
          </StyledFormItem>
          <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.source !== currentValues.source}>
            {({getFieldValue, setFieldsValue}) => {
              let testSourceValue: string = getFieldValue('source');

              if (!testSourceValue === source) {
                setFieldsValue({
                  branch: '',
                  path: '',
                  username: '',
                  token: '',
                  uri: '',
                });
              }

              if (testSourceValue) {
                testSourceValue = !additionalFields[testSourceValue] ? 'custom' : testSourceValue;

                return (
                  <StyledSpace size={24} direction="vertical">
                    {renderFormItems(additionalFields[testSourceValue], {
                      onFileChange: file => onFileChange(file, form),
                    })}
                  </StyledSpace>
                );
              }
            }}
          </Form.Item>
        </StyledSpace>
      </ConfigurationCard>
    </Form>
  );
};

export default Source;
