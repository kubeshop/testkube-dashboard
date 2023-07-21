import {ReactComponent as NewIcon} from '@assets/newIcon.svg';

import {NewTabContainer} from './NewTab.styled';

interface NewTabProps {
  title: string;
}

const NewTab: React.FC<NewTabProps> = ({title}) => {
  return (
    <NewTabContainer>
      {title}
      <NewIcon />
    </NewTabContainer>
  );
};

export default NewTab;
