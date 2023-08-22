import React, {ReactNode, useRef} from 'react';

import {Form} from 'antd';

import {Button, Text} from '@custom-antd';

import useInViewport from '@hooks/useInViewport';

import {ErrorNotificationConfig} from '@models/notifications';

import Colors from '@styles/Colors';

import {NotificationContent} from '../Notification';

import {
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
  isWarning?: boolean;
  footerText?: ReactNode;
  onConfirm?: () => Promise<void> | void;
  confirmButtonText?: string;
  onCancel?: () => void;
  isButtonsDisabled?: boolean;
  forceEnableButtons?: boolean;
  children?: ReactNode;
  isEditable?: boolean;
  enabled?: boolean;
  loading?: boolean;
  errors?: ErrorNotificationConfig[];
};

const ConfigurationCard: React.FC<ConfigurationCardProps> = props => {
  const {
    errors,
    title,
    description,
    isWarning = false,
    onConfirm,
    onCancel,
    footerText,
    children,
    confirmButtonText = 'Save',
    isButtonsDisabled,
    forceEnableButtons,
    isEditable = true,
    enabled = true,
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
      </StyledHeaderContainer>
      {children ? (
        <>
          <StyledErrorsContainer>
            {errors?.map(x => (
              <StyledNotificationContainer key={x.title}>
                <NotificationContent status="failed" message={x.message} title={x.title} />
              </StyledNotificationContainer>
            )) || null}
          </StyledErrorsContainer>
          <StyledChildren $isActionsVisible={enabled || !isEditable}>{children}</StyledChildren>
        </>
      ) : null}
      {(enabled && onConfirm) || footerText ? (
        <StyledFooter>
          {footerText && (
            <StyledFooterText>
              <Text className="regular middle" color={Colors.slate400}>
                {footerText}
              </Text>
            </StyledFooterText>
          )}
          {enabled ? (
            <Form.Item noStyle shouldUpdate>
              {({isFieldsTouched, getFieldsValue, validateFields}) => {
                let disabled = isButtonsDisabled || (getFieldsValue() && !isFieldsTouched());

                if (forceEnableButtons) {
                  disabled = false;
                }

                return (
                  <StyledFooterButtonsContainer>
                    <Button onClick={onCancel} $customType="secondary" hidden={!onCancel || disabled || loading}>
                      Cancel
                    </Button>
                    <Button
                      onClick={onConfirm}
                      $customType={isWarning ? 'warning' : 'primary'}
                      disabled={disabled || loading}
                      loading={loading}
                      hidden={!onConfirm}
                      htmlType="submit"
                    >
                      {confirmButtonText}
                    </Button>
                  </StyledFooterButtonsContainer>
                );
              }}
            </Form.Item>
          ) : null}
        </StyledFooter>
      ) : null}
    </StyledContainer>
  );
};

export default ConfigurationCard;
