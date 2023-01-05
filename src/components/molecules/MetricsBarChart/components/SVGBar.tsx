import React from 'react';

type SVGBarProps = {
  width: number;
  height: number;
  margin: number;
  color: string;
};

const SVGBar: React.FC<SVGBarProps> = props => {
  const {width, margin, height, color} = props;

  return (
    <svg width={width + margin} height={height}>
      <rect width={width} height={height} fill={color} />
    </svg>
  );
};

export default SVGBar;
