import {FC} from 'react';

import {QuestionCircleOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';

import {Asterisk} from '@atoms/Asterisk';

import {Text} from '@custom-antd/Typography/Text';

import {Colors} from '@styles/Colors';

type FormItemLabelProps = {
  status?: string;
  text: string;
  tooltipMessage?: string;
  required?: boolean;
};

export const FormItemLabel: FC<FormItemLabelProps> = props => {
  const {status, text, tooltipMessage, required} = props;

  return (
    <>
      <Text className="regular middle" color={status === 'error' ? Colors.amber400 : Colors.slate200}>
        {text}
      </Text>
      {required ? <Asterisk /> : null}
      {tooltipMessage ? (
        <Tooltip title={tooltipMessage}>
          <QuestionCircleOutlined style={{margin: '0 6px'}} />
        </Tooltip>
      ) : null}
    </>
  );
};
