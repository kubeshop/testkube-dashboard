import React, {FC} from 'react';

import {MessagePanel} from '@molecules';
import {MessagePanelProps} from '@molecules/MessagePanel/MessagePanel';

import {MessagePanelListWrapper} from './DecayingMessagePanelList.styled';

export interface DecayingMessagePanelListProps {
  className?: string;
  items?: ({key: string; disabled?: boolean} & Omit<MessagePanelProps, 'onClose'>)[];
  onClose?: () => void;
}

// TODO: Move it as a global helper
// Handle Safari in private mode
const hasLocalStorage = (() => {
  try {
    localStorage.setItem('$$dummy', '$$value');
    return localStorage.getItem('$$dummy') === '$$value';
  } catch (error) {
    return false;
  }
})();

const DecayingMessagePanelList: FC<DecayingMessagePanelListProps> = ({items, onClose, ...attrs}) => {
  const visibleItems = items?.filter(
    item => !item.disabled && (!hasLocalStorage || localStorage.getItem(item.key) !== 'true')
  );

  return visibleItems?.length ? (
    <MessagePanelListWrapper {...attrs}>
      {visibleItems.map(item => {
        const {key, disabled, ...props} = item;
        return (
          <MessagePanel
            key={key}
            {...props}
            onClose={() => {
              if (hasLocalStorage) {
                localStorage.setItem(key, 'true');
              } else {
                item.disabled = true;
              }
              onClose?.();
            }}
          />
        );
      })}
    </MessagePanelListWrapper>
  ) : null;
};

export default DecayingMessagePanelList;
