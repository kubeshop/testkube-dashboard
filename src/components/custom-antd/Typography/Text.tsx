import {FC} from 'react';

import {TextProps as AntdTextProps} from 'antd/lib/typography/Text';
import {TypographyProps as AntTypographyProps} from 'antd/lib/typography/Typography';

import {StyledText} from './Text.styled';

type TextProps = {
  color?: string;
};

export const Text: FC<AntTypographyProps<any> & AntdTextProps & TextProps> = props => {
  const {children, color, className = 'regular small', ...rest} = props;

  const classNames = `testkube-text ${className}`;

  return (
    <StyledText $color={color} className={classNames} {...rest}>
      {children}
    </StyledText>
  );
};
