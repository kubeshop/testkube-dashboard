import {TitleProps as AntdTitleProps} from 'antd/lib/typography/Title';
import {TypographyProps as AntTypographyProps} from 'antd/lib/typography/Typography';

import {StyledTitle} from './Title.styled';

type TitleProps = {
  color?: string;
};

const Title: React.FC<AntTypographyProps<any> & AntdTitleProps & TitleProps> = props => {
  const {children, color, ...rest} = props;

  return (
    <StyledTitle className="dashboard-title" $color={color} {...rest}>
      {children}
    </StyledTitle>
  );
};

export default Title;
