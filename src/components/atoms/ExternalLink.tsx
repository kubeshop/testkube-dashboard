import {AnchorHTMLAttributes, FC} from 'react';

export const ExternalLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = props => {
  const {children, ...rest} = props;

  return (
    <a target="_blank" {...rest}>
      {children}
    </a>
  );
};
