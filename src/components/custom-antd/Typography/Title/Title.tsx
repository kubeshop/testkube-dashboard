import {TitleProps as AntdTitleProps} from 'antd/lib/typography/Title';
import {TypographyProps as AntTypographyProps} from 'antd/lib/typography/Typography';

import {StyledTitle} from './Title.styled';

const Title: React.FC<AntTypographyProps & AntdTitleProps & {color?: any}> = props => {
  const {children, color, ...rest} = props;

  return (
    <StyledTitle className="dashboard-title" $color={color} {...rest}>
      {children}
    </StyledTitle>
  );
};

export default Title;
