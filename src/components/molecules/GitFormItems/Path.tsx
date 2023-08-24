import {FC} from 'react';

import {Input} from 'antd';

import {FormItem} from '@custom-antd/Form/FormItem';
import {FormItemLabel} from '@custom-antd/Form/FormItem/FormItemLabel';

import {TooltipStatus, getValidationTooltip} from './tooltipUtils';

export const pathPlaceholders: Record<string, string> = {
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
  status?: TooltipStatus;
  message?: string;
};

export const Path: FC<PathProps> = props => {
  const {testType, status = TooltipStatus.None, message} = props;

  return (
    <FormItem
      name="path"
      label={
        <FormItemLabel
          text="Path"
          tooltipMessage="The path is relative to the root of your repository"
          status={status}
        />
      }
      tooltip={getValidationTooltip(status, message)}
      key="path"
    >
      <Input placeholder={pathPlaceholders[testType] || 'tests/path'} />
    </FormItem>
  );
};
