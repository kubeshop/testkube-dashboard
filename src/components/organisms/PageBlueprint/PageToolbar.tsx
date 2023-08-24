import {Children, FC, PropsWithChildren, ReactElement, memo} from 'react';

import {ToolbarContainer, ToolbarContent, ToolbarExtra} from '@organisms/PageBlueprint.styled';

interface PageToolbarProps {
  extra?: ReactElement<any, any> | null;
}

export const PageToolbar: FC<PropsWithChildren<PageToolbarProps>> = memo(({extra, children}) => (
  <ToolbarContainer>
    <ToolbarContent>{children}</ToolbarContent>
    {Children.count(extra) ? <ToolbarExtra>{extra}</ToolbarExtra> : null}
  </ToolbarContainer>
));
