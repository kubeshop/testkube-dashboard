import {FC, ReactElement, createElement, memo, useCallback, useLayoutEffect, useMemo, useState} from 'react';

import {StyledSettingsContainer, StyledTabContentContainer} from './SettingsLayout.styled';
import {SettingsLeftNavigation} from './SettingsLeftNavigation';

export interface SettingsLayoutTab {
  id: string;
  label: string;
  children: FC<{setId(id: string): void}> | ReactElement<any, any> | null;
}

export interface SettingsLayoutProps {
  tabs: SettingsLayoutTab[];
  active?: string;
  onChange?: (id: string) => void;
}

const getActiveId = (tabs: SettingsLayoutTab[], id?: string) => {
  const index = tabs.findIndex(tab => tab.id === id);
  return index === -1 ? tabs[0]?.id : tabs[index].id;
};

export const SettingsLayout: FC<SettingsLayoutProps> = memo(({tabs, active, onChange}) => {
  const [id, setId] = useState(getActiveId(tabs, active));
  const labels = useMemo(() => tabs.map(tab => tab.label), [tabs]);

  useLayoutEffect(() => {
    const newId = getActiveId(tabs, active ?? id);
    if (newId !== id) {
      setId(newId);
    }
  }, [tabs, active]);

  const selectedOption = tabs.findIndex(tab => tab.id === id);
  const setSelectedOption = useCallback(
    (index: number) => {
      const newId = tabs[index].id;
      if (active == null) {
        setId(newId);
      }
      onChange?.(newId);
    },
    [tabs, active, onChange]
  );

  const render = tabs[selectedOption]?.children;

  return (
    <StyledSettingsContainer>
      <SettingsLeftNavigation options={labels} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <StyledTabContentContainer key={id}>
        {typeof render === 'function' ? createElement(render, {setId}) : render}
      </StyledTabContentContainer>
    </StyledSettingsContainer>
  );
});
