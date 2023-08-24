import {FC} from 'react';

import {Tooltip} from 'antd';

import {Text} from '@custom-antd/Typography/Text';

import {TagContainer} from './Tag.styled';

export interface TagProps {
  title: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  tooltipMessage?: string;
}

export const Tag: FC<TagProps> = ({title, type = '', tooltipMessage}) => {
  return (
    <TagContainer className={`${type}`}>
      {tooltipMessage ? (
        <Tooltip title={tooltipMessage}>
          <Text className="regular small">{title}</Text>
        </Tooltip>
      ) : (
        <Text className="regular small">{title}</Text>
      )}
    </TagContainer>
  );
};
