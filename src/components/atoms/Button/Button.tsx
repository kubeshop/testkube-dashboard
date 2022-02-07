import React from 'react';

import styled from 'styled-components';

import Colors from '@styles/Colors';

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
  border-radius: 3px;
  text-transform: none;
  vertical-align: baseline;
  white-space: normal;
  word-spacing: normal;
  text-align: center;

  /* Sizes. */
  // margin: 15px 5px;
  padding: ${props =>
    props.variant === 'primary' ? '5px 16px' : props.variant === 'secondary' ? '15px ​25px' : '15px ​25px'};
  border: 1px solid ${Colors.blue6};
  width: ${props => (props.variant === 'primary' ? '60px' : props.variant === 'secondary' ? '100px' : '35px')};
  height: ${props => (props.variant === 'primary' ? '24px' : props.variant === 'secondary' ? '35px' : '24px')};

  /* Color & Background */
  color: ${({active}) => (active ? 'var(--color-gray-primary)' : Colors.blue6)};
  background: ${({active}) => (active ? Colors.blue6 : 'var(--color-dark-primary)')};

  /* Effects. */
  transition: background 0.1s ease-in-out, color 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: ${({disableFilter}) => (disableFilter ? 'var(--color-dark-primary)' : '')};
    color: ${({disableFilter}) => (disableFilter ? Colors.blue6 : '')};
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--color-dark-primary);
    background: ${Colors.blue6};
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
