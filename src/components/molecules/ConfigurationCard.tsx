import {FC, ReactNode, useRef} from 'react';

import {Form} from 'antd';

import {Button} from '@custom-antd/Button';
import {Text} from '@custom-antd/Typography/Text';

import {useInViewport} from '@hooks/useInViewport';

import type {ErrorNotificationConfig} from '@models/notifications';

import {Colors} from '@styles/Colors';

import {
  HeaderAction,
  StyledChildren,
  StyledContainer,
  StyledErrorsContainer,
  StyledFooter,
  StyledFooterButtonsContainer,
  StyledFooterText,
  StyledHeader,
  StyledHeaderContainer,
  StyledNotificationContainer,
} from './ConfigurationCard.styled';
import {NotificationContent} from './Notification/NotificationContent';

type ConfigurationCardProps = {
  title: ReactNode;
  description: ReactNode;
  isWarning?: boolean;
  footer?: ReactNode;
  headerAction?: ReactNode;
  confirmLabel?: string;
  wasTouched?: boolean;
  children?: ReactNode;
  readOnly?: boolean;
  loading?: boolean;
  errors?: ErrorNotificationConfig[];
  onCancel?: () => void;
};

export const ConfigurationCard: FC<ConfigurationCardProps> = props => {
  const {
    errors,
    title,
    description,
    headerAction,
    onCancel,
    footer,
    children,
    confirmLabel = 'Save',
    wasTouched,
    isWarning = false,
    readOnly = false,
    loading = false,
  } = props;
  const topRef = useRef<HTMLDivElement>(null);
  const inTopInViewport = useInViewport(topRef);

  if (errors && !inTopInViewport && topRef?.current) {
    topRef.current.scrollIntoView();
  }

  return (
    <StyledContainer isWarning={isWarning}>
      <StyledHeaderContainer ref={topRef}>
        <StyledHeader>
          <Text className="regular big" color={Colors.slate50}>
            {title}
          </Text>
          <Text className="regular middle" color={Colors.slate400}>
            {description}
          </Text>
        </StyledHeader>
        {headerAction ? <HeaderAction>{headerAction}</HeaderAction> : null}
      </StyledHeaderContainer>
      {children && errors?.length ? (
        <StyledErrorsContainer>
          {errors?.map(x => (
            <StyledNotificationContainer key={x.title}>
              <NotificationContent status="failed" message={x.message} title={x.title} />
            </StyledNotificationContainer>
          )) || null}
        </StyledErrorsContainer>
      ) : null}
      {children ? <StyledChildren>{children}</StyledChildren> : null}
      {!readOnly || footer ? (
        <StyledFooter>
          {footer ? (
            <StyledFooterText>
              <Text className="regular middle" color={Colors.slate400}>
                {footer}
              </Text>
            </StyledFooterText>
          ) : null}
          {readOnly ? null : (
            <Form.Item noStyle shouldUpdate>
              {({isFieldsTouched, getFieldsValue}) => {
                const buttonsDisabled = loading || (wasTouched ? false : getFieldsValue() && !isFieldsTouched());

                return (
                  <StyledFooterButtonsContainer>
                    <Button onClick={onCancel} $customType="secondary" hidden={!onCancel || buttonsDisabled}>
                      Cancel
                    </Button>
                    <Button
                      $customType={isWarning ? 'warning' : 'primary'}
                      disabled={buttonsDisabled}
                      loading={loading}
                      htmlType="submit"
                    >
                      {confirmLabel}
                    </Button>
                  </StyledFooterButtonsContainer>
                );
              }}
            </Form.Item>
          )}
        </StyledFooter>
      ) : null}
    </StyledContainer>
  );
};
