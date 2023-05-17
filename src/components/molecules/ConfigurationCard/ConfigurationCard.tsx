import React, {ReactElement, useState} from 'react';

import {Form} from 'antd';

import {ErrorNotificationConfig} from '@models/notifications';

import {Button, Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {NotificationContent} from '../Notification';
import {
  StyledChildren,
  StyledContainer,
  StyledFooter,
  StyledFooterButtonsContainer,
  StyledFooterText,
  StyledHeader,
  StyledNotificationContainer,
} from './ConfigurationCard.styled';

type ConfigurationCardProps = {
  title: string;
  description: string | ReactElement;
  isWarning?: boolean;
  footerText?: React.ReactNode;
  onConfirm?: () => Promise<ErrorNotificationConfig | null> | void;
  confirmButtonText?: string;
  onCancel?: () => void;
  isButtonsDisabled?: boolean;
  forceEnableButtons?: boolean;
  children?: React.ReactNode;
  isEditable?: boolean;
  enabled?: boolean;
};

const ConfigurationCard: React.FC<ConfigurationCardProps> = props => {
  const {
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
  } = props;
  const [error, setError] = useState<ErrorNotificationConfig | null>(null);

  return (
    <StyledContainer isWarning={isWarning}>
      <StyledHeader>
        <Text className="regular big" color={Colors.slate50}>
          {title}
        </Text>
        <Text className="regular middle" color={Colors.slate400}>
          {description}
        </Text>
      </StyledHeader>
      {children ? (
        <>
          {error ? (
            <StyledNotificationContainer>
              <NotificationContent status="failed" message={error.message} title={error.title} />
            </StyledNotificationContainer>
          ) : null}
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
                        setError(null);
                      }}
                      $customType="secondary"
                      hidden={!onCancel || disabled}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        validateFields?.().then(() => {
                          const confirmResult = onConfirm?.();

                          if (typeof confirmResult === 'object' && typeof confirmResult.then === 'function') {
                            confirmResult.then((res: any) => {
                              setError(res);
                            });
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
