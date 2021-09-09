import React from 'react';
import styled from 'styled-components/';

interface IImage {
  src: string;
  alt: string;
  type: string;
  size?: number | null;
  width?: number;
  height?: number;
}

const StyledImage = styled.img<IImage>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-repeat: no-repeat;
  border-radius: ${props => (props.size ? '50%' : '0')};
`;

const Image = ({src, alt, type, size, width, height}: IImage) => {
  return <StyledImage src={src} alt={alt} type={type} size={size} width={width} height={height} />;
};

export default Image;
