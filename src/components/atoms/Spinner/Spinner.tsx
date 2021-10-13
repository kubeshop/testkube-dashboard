import React from 'react';
import styled, {keyframes} from 'styled-components';

const load1Keyframe = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }

  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
`;

const StyledLoaderContainer = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledLoader = styled.div`
  color: #fff;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  transform: translateZ(0);
  animation-delay: -0.16s;

  &.loader,
  ::before,
  &::after {
    background: #fff;
    animation: ${load1Keyframe} 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }

  &.loader {
    color: #fff;
    text-indent: -9999em;
    margin: 88px auto;
    position: relative;
    font-size: 11px;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }

  &.loader::before,
  &.loader::after {
    position: absolute;
    top: 0;
    content: '';
  }

  &.loader::before {
    left: -1.5em;
    animation-delay: -0.32s;
  }

  &.loader::after {
    left: 1.5em;
  }
`;

const Spinner = () => {
  return (
    <StyledLoaderContainer className="loaderContainer">
      <StyledLoader className="loader">Loading...</StyledLoader>
    </StyledLoaderContainer>
  );
};

export default Spinner;
