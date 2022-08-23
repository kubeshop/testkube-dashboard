import React from 'react';

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
        {footerText ? <StyledFooterText>{footerText}</StyledFooterText> : null}
        <StyledFooterButtonsContainer>
          {onCancel ? (
            <Button onClick={onCancel} $customType="secondary" disabled={isButtonsDisabled}>
              Cancel
            </Button>
          ) : null}
          {onConfirm ? (
            <Button onClick={onConfirm} $customType={isWarning ? 'warning' : 'primary'} disabled={isButtonsDisabled}>
              {confirmButtonText}
            </Button>
          ) : null}
        </StyledFooterButtonsContainer>
      </StyledFooter>
    </StyledContainer>
  );
};

export default ConfigurationCard;
