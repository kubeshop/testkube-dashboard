import {QuestionCircleOutlined} from '@ant-design/icons';
import {Tooltip} from 'antd';

import {Asterisk} from '@atoms';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

type FormItemLabelProps = {
  status?: string;
  text: string;
  tooltipMessage?: string;
  required?: boolean;
};

const FormItemLabel: React.FC<FormItemLabelProps> = props => {
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

export default FormItemLabel;
