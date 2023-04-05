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
  disabled?: boolean;
  children?: React.ReactNode;
};

const ConfigurationCard: React.FC<ConfigurationCardProps> = props => {
  const {
    title,
    description,
    isWarning = false,
    disabled = false,
    onConfirm,
    onCancel,
    footerText,
    children,
    confirmButtonText = 'Save',
    isButtonsDisabled,
    forceEnableButtons,
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
      {children ? <StyledChildren>{children}</StyledChildren> : null}
      {(onConfirm || footerText) && (
        <StyledFooter>
          {footerText && (
            <StyledFooterText>
              <Text className="regular middle" color={Colors.slate400}>
                {footerText}
              </Text>
            </StyledFooterText>
          )}
          <Form.Item noStyle shouldUpdate>
            {({isFieldsTouched, getFieldsValue}) => {
              let isDisabled = isButtonsDisabled || (getFieldsValue() && !isFieldsTouched());

              if (forceEnableButtons) {
                isDisabled = false;
              }
              if (disabled) {
                isDisabled = true;
              }

              return (
                <StyledFooterButtonsContainer>
                  {onCancel && !isDisabled && (
                    <Button onClick={onCancel} $customType="secondary">
                      Cancel
                    </Button>
                  )}
                  {onConfirm ? (
                    <Button onClick={onConfirm} $customType={isWarning ? 'warning' : 'primary'} disabled={isDisabled}>
                      {confirmButtonText}
                    </Button>
                  ) : null}
                </StyledFooterButtonsContainer>
              );
            }}
          </Form.Item>
        </StyledFooter>
      )}
    </StyledContainer>
  );
};

export default ConfigurationCard;
