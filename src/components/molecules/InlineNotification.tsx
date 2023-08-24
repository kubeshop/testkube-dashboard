import {FC} from 'react';

import {Text} from '@custom-antd/Typography/Text';

import {InlineNotificationWrapper} from './InlineNotification.styled';

interface InlineNotificationProps {
  title?: string;
  description: JSX.Element;
  type: 'warning' | 'error';
}
export const InlineNotification: FC<InlineNotificationProps> = props => {
  const {type = 'error', title, description} = props;

  return (
    <InlineNotificationWrapper className={type}>
      {title ? <Text className="bold middle title">{title}</Text> : null}
      <Text className="regular middle description">{description}</Text>
    </InlineNotificationWrapper>
  );
};
