import {FC, ReactNode} from 'react';
import {To} from 'react-router';

import {Tooltip} from 'antd';

import {ExternalLink} from '@atoms';

import {useDashboardNavigate} from '@hooks/useDashboardNavigate';

import {hasProtocol} from '@utils/strings';

export interface ContextDisplayProps {
  url?: To;
  label?: ReactNode;
  text?: ReactNode;
  tooltip?: ReactNode;
  wrap?: boolean;
}

const ContextDisplay: FC<ContextDisplayProps> = ({url, label, tooltip, wrap, text}) => {
  const isExternal = typeof url === 'string' && hasProtocol(url);
  const navigate = useDashboardNavigate(url || '');
  const content = tooltip ? (
    <Tooltip title={tooltip}>
      <span>{text}</span>
    </Tooltip>
  ) : (
    text
  );
  const finalPrefix = label && content ? <>{label} </> : undefined;
  const item = isExternal ? (
    <ExternalLink href={url}>{content || label}</ExternalLink>
  ) : url ? (
    <a onClick={navigate}>{content || label}</a>
  ) : (
    content || label
  );
  if (wrap && finalPrefix) {
    return (
      <>
        {finalPrefix}({item})
      </>
    );
  }
  return (
    <>
      {finalPrefix}
      {item}
    </>
  );
};

export default ContextDisplay;
