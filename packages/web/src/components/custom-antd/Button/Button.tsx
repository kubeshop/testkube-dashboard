import {Tooltip} from 'antd';

import {AntdCustomStyledButton, ICustomButtonProps} from './Button.styled';

const Button: React.FC<ICustomButtonProps> = ({
  hidden = false,
  $withPadding = true,
  tooltip = undefined,
  tooltipPlacement = undefined,
  ...props
}) => {
  return !hidden ? (
    <Tooltip title={tooltip} placement={tooltipPlacement}>
      <AntdCustomStyledButton {...props} $withPadding={$withPadding} />{' '}
    </Tooltip>
  ) : (
    <></>
  );
};

export default Button;
