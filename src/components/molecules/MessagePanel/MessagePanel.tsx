import {CloseOutlined} from '@ant-design/icons';

import {Button, FullWidthSpace, Text} from '@custom-antd';
import {ICustomButtonProps} from '@custom-antd/Button/Button.styled';

import Colors from '@styles/Colors';

import {
  CloseButtonWrapper,
  MessageDescription,
  MessageDescriptionText,
  MessagePanelWrapper,
} from './MessagePanel.styled';

interface ButtonConfig {
  type: ICustomButtonProps['$customType'];
  text: string;
  onClick?: () => void;
}

interface ButtonWithLinkConfig extends ButtonConfig {
  isLink: boolean;
  linkConfig: {
    href: string;
    target: string;
  };
}

interface MessagePanelProps {
  title: string;
  description: React.ReactNode;
  type?: 'warning' | 'error' | 'default';
  position?: 'inline';
  buttons?: (ButtonConfig | ButtonWithLinkConfig)[];
  isClosable?: boolean;
  onClose?: () => void;
}

const textColorForType: Record<string, Record<string, Colors>> = {
  error: {
    header: Colors.rose100,
    description: Colors.rose200,
  },
  warning: {
    header: Colors.amber100,
    description: Colors.amber200,
  },
  default: {
    header: Colors.indigo100,
    description: Colors.indigo200,
  },
};

const MessagePanel: React.FC<MessagePanelProps> = props => {
  const {type = 'error', title, description, position, buttons, isClosable, onClose} = props;

  return (
    <MessagePanelWrapper className={`${type} ${position || ''}`}>
      <MessageDescription>
        <Text className="bold middle" color={textColorForType[type].header}>
          {title}
        </Text>
        <MessageDescriptionText className={`regular middle ${type}`} color={textColorForType[type].description}>
          {description}
        </MessageDescriptionText>
      </MessageDescription>
      <FullWidthSpace style={{flex: 0}}>
        {buttons
          ? buttons.map(button => {
              if ('isLink' in button) {
                return (
                  <a key={button.linkConfig.href} href={button.linkConfig.href} target={button.linkConfig.target}>
                    <Button $customType={button.type} key={button.type}>
                      {button.text}
                    </Button>
                  </a>
                );
              }

              return (
                <Button $customType={button.type} key={button.type} onClick={button.onClick}>
                  {button.text}
                </Button>
              );
            })
          : null}
        {isClosable ? (
          <CloseButtonWrapper>
            <CloseOutlined onClick={onClose} />
          </CloseButtonWrapper>
        ) : null}
      </FullWidthSpace>
    </MessagePanelWrapper>
  );
};

export default MessagePanel;
