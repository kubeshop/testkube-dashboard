import React, {FC} from 'react';

import styled from 'styled-components';

import {Line} from './ConsoleLine';

const StyledLine = styled(Line)`
  cursor: pointer;
  font-weight: bold;
  color: #7984f4;
`;

export const ExpandButton: FC<{visibleLines: number; totalLines: number; onClick: () => void}> = ({
  visibleLines,
  totalLines,
  onClick,
}) => <StyledLine onClick={onClick}>Click to show previous {totalLines - visibleLines} lines</StyledLine>;
