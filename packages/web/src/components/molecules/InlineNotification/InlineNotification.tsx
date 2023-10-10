import {Text} from '@custom-antd';

import {InlineNotificationWrapper} from './InlineNotification.styled';

interface InlineNotificationProps {
  title?: string;
  description: JSX.Element;
  type: 'warning' | 'error';
}
const InlineNotification: React.FC<InlineNotificationProps> = props => {
  const {type = 'error', title, description} = props;

  return (
    <InlineNotificationWrapper className={type}>
      {title ? <Text className="bold middle title">{title}</Text> : null}
      <Text className="regular middle description">{description}</Text>
    </InlineNotificationWrapper>
  );
};

export default InlineNotification;
