import {FC, ReactNode} from 'react';

import {Tooltip} from 'antd';

import {Text} from '@custom-antd';

import {TagContainer} from './Tag.styled';

export interface TagProps {
  title: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  tooltipMessage?: string;
  icon?: ReactNode;
}

const Tag: FC<TagProps> = ({title, type = '', tooltipMessage, icon}) => {
  return (
    <TagContainer className={`${type}`}>
      {tooltipMessage ? (
        <Tooltip title={tooltipMessage}>
          <Text className="regular small">{title}</Text>
        </Tooltip>
      ) : (
        <>
          {icon}
          <Text className="regular small">{title}</Text>
        </>
      )}
    </TagContainer>
  );
};

export default Tag;
