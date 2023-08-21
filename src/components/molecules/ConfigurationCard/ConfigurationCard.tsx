import React, {ReactNode, useRef, useState} from 'react';

import {Form} from 'antd';

import {Button, Text} from '@custom-antd';

import useInViewport from '@hooks/useInViewport';

import {ErrorNotification, ErrorNotificationConfig} from '@models/notifications';

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
  headerAction?: ReactNode;
  isWarning?: boolean;
  footerText?: ReactNode;
  onConfirm?: () => Promise<ErrorNotification | void> | void;
  confirmButtonText?: string;
  onCancel?: () => void;
  isButtonsDisabled?: boolean;
  forceEnableButtons?: boolean;
  children?: ReactNode;
  isEditable?: boolean;
  enabled?: boolean;
};

const ConfigurationCard: React.FC<ConfigurationCardProps> = props => {
  const {
    title,
    description,
    headerAction,
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
  } = props;
  const [errors, setErrors] = useState<ErrorNotificationConfig[] | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const inTopInViewport = useInViewport(topRef);

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
        {headerAction && <HeaderAction>{headerAction}</HeaderAction>}
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
                    <Button
                      onClick={() => {
                        onCancel?.();
                        setErrors(null);
                      }}
                      $customType="secondary"
                      hidden={!onCancel || disabled}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setErrors(null);
                        Promise.resolve(validateFields?.())
                          .then(() => onConfirm?.())
                          .catch((err: ErrorNotification) => {
                            if ('errors' in err) {
                              setErrors(err.errors);
                            } else if (err.title || err.message) {
                              setErrors([err]);
                            }

                            if (!inTopInViewport && topRef && topRef.current) {
                              topRef.current.scrollIntoView();
                            }
                          });
                      }}
                      $customType={isWarning ? 'warning' : 'primary'}
                      disabled={disabled}
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
