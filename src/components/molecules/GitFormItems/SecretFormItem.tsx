import {Form, Input} from 'antd';

import {FormItem, Text} from '@custom-antd';

import {secretRegex} from '@utils/strings';

import Colors from '@styles/Colors';

type SecretFormItemProps = {
  isClearedValue?: boolean;
  setIsClearedValue?: (value: boolean) => void;
  name: string;
  label: string;
};

const SecretFormItem: React.FC<SecretFormItemProps> = props => {
  const {isClearedValue, setIsClearedValue, name, label} = props;

  const rules = isClearedValue ? [{pattern: secretRegex, message: `Invalid ${name} value`}] : [];

  return (
    <Form.Item noStyle shouldUpdate>
      {({setFieldValue}) => {
        return (
          <>
            <FormItem name={name} label={label} key={name} rules={rules}>
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