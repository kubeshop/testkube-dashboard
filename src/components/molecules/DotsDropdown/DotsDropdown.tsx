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
}

const DotsDropdown: React.FC<DotsDropdownProps> = ({
  items,
  placement = 'bottom',
  withPadding = true,
  isTransparent = true,
}) => {
  return (
    <Dropdown
      trigger={['click']}
      menu={{
        items,
      }}
      placement={placement}
    >
      <DotsWrapper isTransparent={isTransparent}>
        <Dots color={Colors.grey450} withPadding={withPadding} />
      </DotsWrapper>
    </Dropdown>
  );
};

export default DotsDropdown;
