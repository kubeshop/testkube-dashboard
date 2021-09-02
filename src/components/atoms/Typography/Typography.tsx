import React from 'react';
import styled from 'styled-components';

interface ITypography extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
}

const StyledTypography = styled.p<ITypography>`
  font-family: var(--font-family-sans);
  font-size: ${props =>
    props.variant === 'primary'
      ? 'var(--font-size-3xl)'
      : props.variant === 'secondary'
      ? 'var(--font-size-md)'
      : props.variant === 'tertiary'
      ? 'var(--font-size-lg)'
      : props.variant === 'quaternary'
      ? 'var(--font-size-xl)'
      : props.variant === 'quinary'
      ? 'var(--font-size-mid-4xl)'
      : 'var(--font-size-md)'};
  font-weight: ${props => (props.variant === 'primary' ? 'var(--font-weight-bold)' : 'var(--font-weight-small)')};
  color: ${props =>
    props.color === 'primary'
      ? 'var(--color-light-primary)'
      : props.color === 'secondary'
      ? 'var(--color-light-secondary)'
      : props.color === 'tertiary'
      ? 'var(--color-gray-primary)'
      : props.color === 'quaternary'
      ? 'var(--color-yellow-primary)'
      : props.color === 'quinary'
      ? 'var(--color-monokle-primary)'
      : 'var(--color-light-primary)'};
  letter-spacing: 0;
  word-wrap: no-wrap;
`;

const Typography: React.FC<ITypography> = ({children, color = 'primary', variant = 'primary', ...typographyProps}) => {
  return (
    <StyledTypography variant={variant} color={color} {...typographyProps}>
      {children}
    </StyledTypography>
  );
};

export default Typography;
