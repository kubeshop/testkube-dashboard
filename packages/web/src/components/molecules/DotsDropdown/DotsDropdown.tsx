import {Dropdown} from 'antd';
import {ItemType} from 'antd/lib/menu/hooks/useItems';

import {Dots} from '@atoms';

import Colors from '@styles/Colors';

import {DotsWrapper} from './DotsDropdown.styled';

interface DotsDropdownProps {
  items: ItemType[];
  placement?:
    | 'bottom'
    | 'top'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | undefined;
  withPadding?: boolean;
  wrapperStyle?: React.CSSProperties;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlayClassName?: string;
  disabled?: boolean;
}

const DotsDropdown: React.FC<DotsDropdownProps> = ({
  items,
  placement = 'bottom',
  withPadding = true,
  wrapperStyle = {},
  trigger = ['click'],
  overlayClassName = 'light-dropdown',
  disabled,
}) => {
  return (
    <Dropdown
      overlayClassName={overlayClassName}
      trigger={trigger}
      menu={{
        items,
      }}
      placement={placement}
      disabled={disabled}
    >
      <DotsWrapper style={wrapperStyle} onClick={event => event.stopPropagation()}>
        <Dots color={Colors.grey450} withPadding={withPadding} disabled={disabled} />
      </DotsWrapper>
    </Dropdown>
  );
};

export default DotsDropdown;
