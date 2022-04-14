import {TitleProps as AntdTitleProps} from 'antd/lib/typography/Title';
import {TypographyProps as AntTypographyProps} from 'antd/lib/typography/Typography';

import {StyledTitle} from './Title.styled';

const Title: React.FC<AntTypographyProps & AntdTitleProps> = props => {
  const {children, ...rest} = props;

  return (
    <StyledTitle className="default-title" {...rest}>
      {children}
    </StyledTitle>
  );
};

export default Title;
