import {FC, ReactElement} from 'react';

import {IconLabelContainer} from './IconLabel.styled';

interface NewTabProps {
  title: string;
  icon: ReactElement;
}

export const IconLabel: FC<NewTabProps> = ({title, icon}) => {
  return (
    <IconLabelContainer>
      {title}
      {icon}
    </IconLabelContainer>
  );
};
