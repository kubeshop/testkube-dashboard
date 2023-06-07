import {FC, ReactElement, memo, useCallback, useLayoutEffect, useMemo, useState} from 'react';

import {SettingsLeftNavigation, StyledTabContentContainer} from '@molecules';

import {StyledSettingsContainer} from './SettingsLayout.styled';

export interface SettingsLayoutTab {
  id: string;
  label: string;
  children: ReactElement<any, any> | null;
}

interface SettingsLayoutProps {
  tabs: SettingsLayoutTab[];
  active?: string;
  onChange?: (id: string) => void;
}

const getActiveId = (tabs: SettingsLayoutTab[], id?: string) => {
  const index = tabs.findIndex(tab => tab.id === id);
  return index === -1 ? tabs[0]?.id : tabs[index].id;
};

const SettingsLayout: FC<SettingsLayoutProps> = ({tabs, active, onChange}) => {
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

  return (
    <StyledSettingsContainer>
      <SettingsLeftNavigation options={labels} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <StyledTabContentContainer key={id}>{tabs[selectedOption]?.children}</StyledTabContentContainer>
    </StyledSettingsContainer>
  );
};

export default memo(SettingsLayout);
