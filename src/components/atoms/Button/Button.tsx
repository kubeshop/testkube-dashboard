import React from 'react';
import styled from 'styled-components';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'base' | 'selected';
}

const StyledButton = styled.button<IButton>`
  /* Fixture. */
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Fonts and Text. */
  font-family: var(--font-family-sans);
  font-size: var(--font-size-md);
  font-style: normal;
  font-variant: normal;
  font-weight: var(--font-weight-regular);
  letter-spacing: normal;
  line-height: normal;
  text-decoration: none solid rgb(0, 0, 0);
  border-radius: var(--font-size-xl);
  text-transform: none;
  vertical-align: baseline;
  white-space: normal;
  word-spacing: normal;
  text-align: center;

  /* Sizes. */
  margin: 0.9rem 0.6rem;
  padding: var(--font-size-ssm) var(--font-size-lg);
  border: 1px solid var(--color-monokle-primary);

  /* Color & Background */
  color: ${({variant}) => (variant === 'selected' ? 'var(--color-dark-primary)' : 'var(--color-monokle-primary)')};
  background: ${({variant}) =>
    variant === 'selected' ? 'var(--color-monokle-primary) ' : 'var(--color-dark-primary)'};

  /* Effects. */
  transition: background 0.3s ease-in-out, color 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: ${({variant}) =>
      variant === 'selected' ? 'var(--color-dark-primary)' : 'var(--color-monokle-primary)'};
    color: ${({variant}) => (variant === 'selected' ? 'var(--color-monokle-primary) ' : 'var(--color-dark-primary)')};
  }

  &:active {
    color: var(--color-dark-primary);
    background: var(--color-monokle-primary);
  }

  &:disabled {
    cursor: not-allowed;
    background: var(--color-gray-secondary);
    color: var(--color-light-secondary);
  }
`;

const Button: React.FC<IButton> = ({children, variant = 'base', disabled, ...buttonProps}) => {
  return (
    <StyledButton variant={variant} {...buttonProps} disabled={disabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
