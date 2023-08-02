import {Text} from '@custom-antd';

import {TagContainer} from './Tag.styled';

export interface TagProps {
  title: string;
  type?: 'success' | 'warning' | 'error' | 'info';
}

const Tag: React.FC<TagProps> = ({title, type = ''}) => {
  return (
    <TagContainer className={`${type}`}>
      <Text className="regular small">{title}</Text>
    </TagContainer>
  );
};

export default Tag;
