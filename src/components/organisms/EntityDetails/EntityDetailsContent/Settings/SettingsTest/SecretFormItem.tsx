import {Form, Input} from 'antd';

import {FormItem, Text} from '@custom-antd';

import {isGitSourceType, SourceType} from '@models';

import Colors from '@styles/Colors';

type SecretFormItemProps = {
  isClearedValue: boolean;
  setIsClearedValue: (value: boolean) => void;
  name: string;
  label: string;
};

const SecretFormItem: React.FC<SecretFormItemProps> = props => {
  const {isClearedValue, setIsClearedValue, name, label} = props;

  return (
    <Form.Item noStyle shouldUpdate>
      {({setFieldValue, getFieldValue}) => {
        const testSourceValue: SourceType = getFieldValue('testSource');

        if (isGitSourceType(testSourceValue)) {
          return (
            <>
              <FormItem name={name} label={label}>
                <Input.Password placeholder={label} disabled={!isClearedValue} />
              </FormItem>
              {!isClearedValue ? (
                <Text
                  style={{cursor: 'pointer', marginTop: '5px'}}
                  className="middle regular"
                  color={Colors.indigo400}
                  onClick={() => {
                    setFieldValue(name, '');
                    setIsClearedValue(true);
                  }}
                >
                  Remove {name}
                </Text>
              ) : null}
            </>
          );
        }
      }}
    </Form.Item>
  );
};

export default SecretFormItem;
