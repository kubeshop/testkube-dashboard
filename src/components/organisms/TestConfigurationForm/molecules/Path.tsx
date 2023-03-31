import {Input} from 'antd';

import {FormItem} from '@custom-antd';

import {required} from '@utils/form';

export const pathPlaceholders: {[key: string]: string} = {
  postman: 'tests/postman/collection.json',
  cypress: 'tests/cypress',
  curl: 'tests/curl/test.json',
  k6: 'tests/k6/index.js',
  soapui: 'tests/soapui/test.xml',
  artillery: 'tests/artillery/test.yaml',
  gradle: 'tests/gradle/my-test',
  maven: 'tests/maven/my-test',
  kubepug: 'tests/kubepug/test.json',
  ginkgo: 'tests/ginkgo/my-test',
  jmeter: 'tests/jmeter/test.jmx',
  playwright: 'tests/playwright/my-test',
};

type PathProps = {
  testType: string;
};

const Path: React.FC<PathProps> = props => {
  const {testType} = props;

  return (
    <FormItem
      name="path"
      label="Path"
      rules={[required]}
      required
      tooltip="The path is relative to the root of your repository"
    >
      <Input placeholder={pathPlaceholders[testType] || 'tests/path'} />
    </FormItem>
  );
};

export default Path;
