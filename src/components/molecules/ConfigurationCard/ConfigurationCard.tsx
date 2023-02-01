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
      <StyledFooter>
        {footerText ? (
          <StyledFooterText>
            <Text className="regular middle" color={Colors.slate400}>
              {footerText}
            </Text>
          </StyledFooterText>
        ) : null}
        <Form.Item noStyle shouldUpdate>
          {({isFieldsTouched, getFieldsValue}) => {
            let isDisabled = isButtonsDisabled || (getFieldsValue() && !isFieldsTouched());

            if (forceEnableButtons) {
              isDisabled = false;
            }
            return (
              <StyledFooterButtonsContainer>
                {onCancel && !isDisabled ? (
                  <Button onClick={onCancel} $customType="secondary">
                    Cancel
                  </Button>
                ) : null}
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
    </StyledContainer>
  );
};

export default ConfigurationCard;
