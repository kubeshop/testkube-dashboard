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
  isTransparent?: boolean;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
}

const DotsDropdown: React.FC<DotsDropdownProps> = ({
  items,
  placement = 'bottom',
  withPadding = true,
  isTransparent = true,
  trigger = ['click'],
}) => {
  return (
    <Dropdown
      trigger={trigger}
      menu={{
        items,
      }}
      placement={placement}
    >
      <DotsWrapper isTransparent={isTransparent} onClick={event => event.stopPropagation()}>
        <Dots color={Colors.grey450} withPadding={withPadding} />
      </DotsWrapper>
    </Dropdown>
  );
};

export default DotsDropdown;
