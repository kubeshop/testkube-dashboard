import {CSSProperties, FC} from 'react';

import {Dropdown} from 'antd';
import {ItemType} from 'antd/lib/menu/hooks/useItems';

import {Dots} from '@atoms/Dots';

import {Colors} from '@styles/Colors';

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
  wrapperStyle?: CSSProperties;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  overlayClassName?: string;
}

export const DotsDropdown: FC<DotsDropdownProps> = ({
  items,
  placement = 'bottom',
  withPadding = true,
  wrapperStyle = {},
  trigger = ['click'],
  overlayClassName = 'light-dropdown',
}) => {
  return (
    <Dropdown
      overlayClassName={overlayClassName}
      trigger={trigger}
      menu={{
        items,
      }}
      placement={placement}
    >
      <DotsWrapper style={wrapperStyle} onClick={event => event.stopPropagation()}>
        <Dots color={Colors.grey450} withPadding={withPadding} />
      </DotsWrapper>
    </Dropdown>
  );
};
