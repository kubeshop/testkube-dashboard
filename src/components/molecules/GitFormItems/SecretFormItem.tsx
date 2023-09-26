import {Form, Input} from 'antd';

import {FormItem, FormItemLabel, Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {dummySecret} from '@utils/sources';
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
  const {isClearedValue = true, setIsClearedValue, name, label, status = TooltipStatus.None, message, disabled} = props;

  const rules = isClearedValue ? [{pattern: secretRegex, message: `Invalid ${name} value`}] : [];

  return (
    <Form.Item noStyle shouldUpdate>
      {({setFieldValue, getFieldValue}) => {
        const fieldValue = getFieldValue(name);

        return (
          <>
            <FormItem
              name={name}
              label={<FormItemLabel text={label} status={status} />}
              key={name}
              rules={rules}
              tooltip={getValidationTooltip(status, message)}
            >
              <Input.Password
                placeholder={isClearedValue ? label : dummySecret}
                disabled={!isClearedValue || disabled}
              />
            </FormItem>
            {fieldValue || isClearedValue === false ? (
              <Text
                style={{display: 'inline-block', cursor: 'pointer', marginTop: '5px'}}
                className="middle regular"
                color={Colors.indigo400}
                onClick={() => {
                  setFieldValue(name, '');
                  setIsClearedValue?.(true);
                }}
              >
                Remove {name}
              </Text>
            ) : null}
          </>
        );
      }}
    </Form.Item>
  );
};

export default SecretFormItem;
