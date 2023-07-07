import React, {FC, PropsWithChildren, ReactElement, memo} from 'react';

import {ToolbarContainer, ToolbarContent, ToolbarExtra} from './PageBlueprint.styled';

interface PageToolbarProps {
  extra?: ReactElement<any, any> | null;
}

const PageToolbar: FC<PropsWithChildren<PageToolbarProps>> = ({extra, children}) => (
  <ToolbarContainer>
    <ToolbarContent>{children}</ToolbarContent>
    {React.Children.count(extra) ? <ToolbarExtra>{extra}</ToolbarExtra> : null}
  </ToolbarContainer>
);

export default memo(PageToolbar);
