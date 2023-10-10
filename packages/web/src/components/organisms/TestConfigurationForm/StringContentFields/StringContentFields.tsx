import TextArea from 'antd/lib/input/TextArea';

import {FormItem} from '@custom-antd';

import Fonts from '@styles/Fonts';

import {required} from '@utils/form';

import {Props} from '../utils';

export const stringPlaceholders: Record<string, string> = {
  curl: `e.g.:
{
  "command": [
    "curl",
    "https://reqbin.com/echo/get/json",
    "-H",
    "'Accept: application/json'"
  ],
  "expected_status": "200",
  "expected_body": "{\"success\":\"true\"}"
}`,
  k6: `e.g.:
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}`,
};

const StringContentFields: React.FC<Partial<Props>> = props => {
  const {executorType, disabled} = props;

  const placeholder = stringPlaceholders[executorType!] || 'String...';
  return (
    <FormItem name="string" label="String" rules={[required]} required>
      <TextArea rows={11} placeholder={placeholder} style={{fontFamily: Fonts.robotoMono}} disabled={disabled} />
    </FormItem>
  );
};

export default StringContentFields;
