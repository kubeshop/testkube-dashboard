import {useEffect, useState} from 'react';

import {LogOutput} from '@molecules';

import {formatVariables} from '@utils/variables';

import {useAddTestMutation} from '@services/tests';

import {getTestSourceSpecificFields} from '../utils';

const ThirdStep: React.FC<any> = props => {
  const {form} = props;

  const [preparedYaml, setPreparedYaml] = useState('');

  const [addTest] = useAddTestMutation();

  const onAddTest = async (values: any) => {
    const {testSource, testType, name} = values;

    const testSourceSpecificFields = getTestSourceSpecificFields(values);

    const requestBody = {
      name,
      type: testType,
      content: {
        type: testSource === 'file-uri' ? 'string' : testSource,
        ...testSourceSpecificFields,
      },
      variables: formatVariables(values['variables-list']),
      headers: {Accept: 'text/yaml'},
    };
    try {
      const res: any = await addTest(requestBody).unwrap();

      setPreparedYaml(res.data);
    } catch (err: any) {
      setPreparedYaml(err.data);
    }
  };

  useEffect(() => {
    const values = form.getFieldsValue(true);

    onAddTest(values);
  }, [form]);

  return (
    <div style={{height: 400}}>
      <LogOutput logOutput={preparedYaml} title={`${form.getFieldsValue(true).name}.yaml`} actions={['fullscreen']} />
    </div>
  );
};

export default ThirdStep;
