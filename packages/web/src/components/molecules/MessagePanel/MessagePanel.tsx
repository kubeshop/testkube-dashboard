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

interface ButtonConfig extends Omit<ICustomButtonProps, 'type'> {
  type: ICustomButtonProps['$customType'];
  text: string;
}

interface ButtonWithLinkConfig extends ButtonConfig {
  isLink: boolean;
  linkConfig: {
    href: string;
    target: string;
  };
}

export interface MessagePanelProps {
  title: string;
  description: React.ReactNode;
  type?: 'warning' | 'error' | 'default';
  position?: 'fullscreen' | 'inline';
  buttons?: (ButtonConfig | ButtonWithLinkConfig)[];
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
  const {type = 'error', title, description, position = 'inline', buttons, onClose} = props;

  return (
    <MessagePanelWrapper className={`${type} ${position}`}>
      <MessageDescription>
        <Text className="bold middle" color={textColorForType[type].header}>
          {title}
        </Text>
        <MessageDescriptionText className={`regular middle ${type}`} color={textColorForType[type].description}>
          {description}
        </MessageDescriptionText>
      </MessageDescription>
      {buttons ? (
        <FullWidthSpace style={{flexWrap: 'wrap', justifyContent: 'flex-end'}}>
          {buttons.map(button => {
            if ('isLink' in button) {
              return (
                <a
                  key={button.linkConfig.href}
                  href={button.linkConfig.href}
                  target={button.linkConfig.target}
                  onClick={button.onClick}
                >
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
          })}
        </FullWidthSpace>
      ) : null}
      {onClose ? (
        <CloseButtonWrapper>
          <CloseOutlined onClick={onClose} />
        </CloseButtonWrapper>
      ) : null}
    </MessagePanelWrapper>
  );
};

export default MessagePanel;
