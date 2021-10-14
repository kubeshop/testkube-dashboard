import React from 'react';
import styled from 'styled-components/';

interface IImage extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  type: string;
  size?: number | null;
  width?: number;
  height?: number;
  onClick?: () => void;
}

const StyledImage = styled.img<IImage>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-repeat: no-repeat;
  border-radius: ${props => (props.size ? '50%' : '0')};

  @media screen and (max-width: 26.5rem) {
    width: 32px;
    height: 32px;
  }
`;

const Image = ({src, alt, type, size, width, height, onClick, ...imageProps}: IImage) => {
  return (
    <StyledImage
      src={src}
      alt={alt}
      type={type}
      size={size}
      width={width}
      height={height}
      onClick={onClick}
      {...imageProps}
    />
  );
};

export default Image;
