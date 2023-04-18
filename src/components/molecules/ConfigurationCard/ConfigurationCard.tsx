import React from 'react';

import {Form} from 'antd';

import {Button, Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {
  StyledChildren,
  StyledContainer,
  StyledFooter,
  StyledFooterButtonsContainer,
  StyledFooterText,
  StyledHeader,
} from './ConfigurationCard.styled';

type ConfigurationCardProps = {
  title: string;
  description: string;
  isWarning?: boolean;
  footerText?: React.ReactNode;
  onConfirm?: () => void;
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
      {children ? <StyledChildren $isActionsVisible={enabled || !isEditable}>{children}</StyledChildren> : null}
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
              {({isFieldsTouched, getFieldsValue}) => {
                let disabled = isButtonsDisabled || (getFieldsValue() && !isFieldsTouched());

                if (forceEnableButtons) {
                  disabled = false;
                }

                return (
                  <StyledFooterButtonsContainer>
                    <Button onClick={onCancel} $customType="secondary" hidden={!onCancel || disabled}>
                      Cancel
                    </Button>
                    <Button onClick={onConfirm} $customType={isWarning ? 'warning' : 'primary'} disabled={disabled} hidden={!onConfirm}>
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
