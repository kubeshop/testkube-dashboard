import React, {ReactNode, useRef} from 'react';

import {Form} from 'antd';

import {Button, Text} from '@custom-antd';

import useInViewport from '@hooks/useInViewport';

import {ErrorNotificationConfig} from '@models/notifications';

import Colors from '@styles/Colors';

import {NotificationContent} from '../Notification';

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

type ConfigurationCardProps = {
  title: ReactNode;
  description: ReactNode;
  name: string;
  isWarning?: boolean;
  footer?: ReactNode;
  headerAction?: ReactNode;
  confirmLabel?: string;
  wasTouched?: boolean;
  skipTouchedValidation?: boolean;
  children?: ReactNode;
  readOnly?: boolean;
  loading?: boolean;
  errors?: ErrorNotificationConfig[];
  onCancel?: () => void;
};

const ConfigurationCard: React.FC<ConfigurationCardProps> = props => {
  const {
    errors,
    title,
    description,
    name,
    headerAction,
    onCancel,
    footer,
    children,
    confirmLabel = 'Save',
    wasTouched,
    skipTouchedValidation = false,
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
          <Text data-testid={`${name}-card-title`} className="regular big" color={Colors.slate50}>
            {title}
          </Text>
          <Text data-testid={`${name}-card-description`} className="regular middle" color={Colors.slate400}>
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
                const buttonsDisabled =
                  loading || (skipTouchedValidation || wasTouched ? false : getFieldsValue() && !isFieldsTouched());

                return (
                  <StyledFooterButtonsContainer>
                    <Button
                      data-testid="configuration-card-cancel-button"
                      $customType="secondary"
                      hidden={!onCancel || buttonsDisabled}
                      onClick={onCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      data-testid="configuration-card-confirm-button"
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

export default ConfigurationCard;
