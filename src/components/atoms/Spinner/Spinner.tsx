import React from 'react';

import {Space, Spin, SpinProps} from 'antd';

import styled from 'styled-components';

interface IStyledSpinnerWrapper extends SpinProps {
  center?: boolean;
}

const StyledSpinnerWrapper = styled.div<IStyledSpinnerWrapper>`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  left: ${props => (props.center ? '50%' : '0')};
`;

const Spinner = (props: IStyledSpinnerWrapper) => {
  const {size, center} = props;

  return (
    <StyledSpinnerWrapper center={center}>
      {/* @ts-ignore-next-line */}
      <Space size={size}>
        <Spin {...props} />
      </Space>
    </StyledSpinnerWrapper>
  );
};

export default Spinner;
