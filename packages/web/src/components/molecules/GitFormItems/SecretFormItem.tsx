import {Form} from 'antd';

import {FormItem, FormItemLabel} from '@custom-antd';

import SecretSelect from '@molecules/SecretSelect';

import {secretRegex} from '@utils/strings';

import {TooltipStatus, getValidationTooltip} from './tooltipUtils';

type SecretFormItemProps = {
  isClearedValue?: boolean;
  setIsClearedValue?: (value: boolean) => void;
  name: string;
  label: string;
  status?: TooltipStatus;
  message?: string;
  disabled?: boolean;
};

const SecretFormItem: React.FC<SecretFormItemProps> = props => {
  const {name, label, status = TooltipStatus.None, message} = props;

  const rules = [{pattern: secretRegex, message: `Invalid ${name} value`}];

  return (
    <Form.Item noStyle shouldUpdate>
      {() => {
        return (
          <FormItem
            name={name}
            label={<FormItemLabel text={label} status={status} />}
            key={name}
            rules={rules}
            tooltip={getValidationTooltip(status, message)}
          >
            <SecretSelect />
          </FormItem>
        );
      }}
    </Form.Item>
  );
};

export default SecretFormItem;
