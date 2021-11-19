import React from 'react';
import styled from 'styled-components';

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
  disableFilter?: boolean;
  variant?: 'primary' | 'secondary';
}

const StyledButton = styled.button<IButton>`
  /* Fixture. */
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Fonts and Text. */
  font-family: var(--font-family-sans);
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: var(--font-weight-regular);
  letter-spacing: normal;
  line-height: normal;
  text-decoration: none solid rgb(0, 0, 0);
  border-radius: ${props => (props.variant === 'primary' ? '3px' : 'var(--space-md)')};
  text-transform: none;
  vertical-align: baseline;
  white-space: normal;
  word-spacing: normal;
  text-align: center;

  /* Sizes. */
  margin: 15px 5px;
  padding: ${props =>
    props.variant === 'primary' ? '5px 16px' : props.variant === 'secondary' ? '15px ​25px' : '15px ​25px'};
  border: 1px solid var(--color-monokle-primary);
  width: ${props => (props.variant === 'primary' ? '60px' : props.variant === 'secondary' ? '100px' : '35px')};
  height: ${props => (props.variant === 'primary' ? '24px' : props.variant === 'secondary' ? '35px' : '24px')};

  /* Color & Background */
  color: ${({active}) => (active ? 'var(--color-gray-primary)' : 'var(--color-monokle-primary)')};
  background: ${({active}) => (active ? 'var(--color-monokle-primary) ' : 'var(--color-dark-primary)')};

  /* Effects. */
  transition: background 0.1s ease-in-out, color 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: ${({disableFilter}) => (disableFilter ? 'var(--color-dark-primary)' : '')};
    color: ${({disableFilter}) => (disableFilter ? 'var(--color-monokle-primary) ' : '')};
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--color-dark-primary);
    background: var(--color-monokle-primary);
  }
`;

const Button: React.FC<IButton> = ({children, disabled, disableFilter, onClick, variant, ...buttonProps}) => {
  const [active, setActive] = React.useState(false);

  const handleOnclick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    setActive(!active);
    onClick && onClick(event);
  };

  return (
    <StyledButton active={active} disabled={disabled} onClick={handleOnclick} variant={variant} {...buttonProps}>
      {children}
    </StyledButton>
  );
};

export default Button;
