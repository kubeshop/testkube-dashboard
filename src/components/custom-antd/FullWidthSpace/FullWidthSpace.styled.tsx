import {Space as AntdSpace, SpaceProps} from 'antd';

import styled from 'styled-components';

export interface FullWidthSpaceProps extends SpaceProps {
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between';
}

export const StyledSpace = styled(AntdSpace)<{$justify: FullWidthSpaceProps['justify']}>`
  justify-content: ${({$justify}) => $justify};

  width: 100%;
`;
