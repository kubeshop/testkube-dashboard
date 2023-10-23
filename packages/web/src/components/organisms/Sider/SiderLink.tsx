import {AnchorHTMLAttributes, MouseEvent, useCallback} from 'react';

import classNames from 'classnames';

import {useRouterPlugin} from '@plugins/router/hooks';

export interface SiderLinkProps {
  href: string;
  active?: RegExp;
}

const SiderLink: React.FC<SiderLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  href,
  active,
  className,
  children,
  ...rest
}) => {
  const {baseUrl, navigate, location} = useRouterPlugin.pick('baseUrl', 'navigate', 'location');
  const finalClassName = classNames(className, {
    active:
      location.pathname === href ||
      location.pathname.startsWith(`${href}/`) ||
      (active && (active.test(location.pathname) || active.test(window.location.pathname))),
  });

  const onClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      navigate(href!);
    },
    [navigate]
  );

  return (
    <a href={`${baseUrl}${href}`} className={finalClassName} onClick={onClick} {...rest}>
      {children}
    </a>
  );
};

export default SiderLink;
