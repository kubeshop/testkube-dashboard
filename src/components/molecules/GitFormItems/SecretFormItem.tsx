import {Form, Input} from 'antd';

import {FormItem, Text} from '@custom-antd';

import {secretRegex} from '@utils/strings';

import Colors from '@styles/Colors';

import FormItemLabel from './FormItemLabel';
import {TooltipStatus, getValidationTooltip} from './tooltipUtils';

type SecretFormItemProps = {
  isClearedValue?: boolean;
  setIsClearedValue?: (value: boolean) => void;
  name: string;
  label: string;
  status?: TooltipStatus;
  message?: string;
};

const SecretFormItem: React.FC<SecretFormItemProps> = props => {
  const {isClearedValue, setIsClearedValue, name, label, status = TooltipStatus.none, message} = props;

  const rules = isClearedValue ? [{pattern: secretRegex, message: `Invalid ${name} value`}] : [];

  return (
    <Form.Item noStyle shouldUpdate>
      {({setFieldValue}) => {
        return (
          <>
            <FormItem
              name={name}
              label={<FormItemLabel text={label} status={status} />}
              key={name}
              rules={rules}
              tooltip={getValidationTooltip(status, message)}
            >
              <Input.Password placeholder={label} disabled={isClearedValue === false} />
            </FormItem>
            {isClearedValue === false ? (
              <Text
                style={{cursor: 'pointer', marginTop: '5px'}}
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
