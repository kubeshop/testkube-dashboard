import {ReactElement} from 'react';

import {IconLabelContainer} from './IconLabel.styled';

interface NewTabProps {
  title: string;
  icon: ReactElement;
}

const IconLabel: React.FC<NewTabProps> = ({title, icon}) => {
  return (
    <IconLabelContainer>
      {title}
      {icon}
    </IconLabelContainer>
  );
};

export default IconLabel;
