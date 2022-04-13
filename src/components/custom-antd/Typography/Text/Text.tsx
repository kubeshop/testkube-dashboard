import {Typography} from 'antd';
import {TextProps as AntdTextProps} from 'antd/lib/typography/Text';
import {TypographyProps as AntTypographyProps} from 'antd/lib/typography/Typography';

const {Text: AntdText} = Typography;

const Text: React.FC<AntTypographyProps & AntdTextProps> = props => {
  const {children, ...rest} = props;

  return <AntdText {...rest}>{children}</AntdText>;
};

export default Text;
