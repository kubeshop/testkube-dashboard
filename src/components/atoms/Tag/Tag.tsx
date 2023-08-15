import {Tooltip} from 'antd';

import {Text} from '@custom-antd';

import {TagContainer} from './Tag.styled';

export interface TagProps {
  title: string;
  type?: 'success' | 'warning' | 'error' | 'info';
  tooltipMessage?: string;
  Icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
}

const Tag: React.FC<TagProps> = ({title, type = '', tooltipMessage, Icon}) => {
  return (
    <TagContainer className={`${type}`}>
      {tooltipMessage ? (
        <Tooltip title={tooltipMessage}>
          <Text className="regular small">{title}</Text>
        </Tooltip>
      ) : (
        <>
          {Icon ? <Icon /> : null}
          <Text className="regular small">{title}</Text>
        </>
      )}
    </TagContainer>
  );
};

export default Tag;
