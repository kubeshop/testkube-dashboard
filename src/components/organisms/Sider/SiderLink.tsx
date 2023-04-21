import {useContext, AnchorHTMLAttributes, useCallback, MouseEvent} from 'react';
import classNames from 'classnames';

import {DashboardContext} from '@contexts';

interface SiderLinkProps {
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
  const {navigate, location} = useContext(DashboardContext);
  const finalClassName = classNames(className, {
    active: (
      (location.pathname === `${href}` || location.pathname.startsWith(`${href}/`)) ||
      (active && active.test(location.pathname))
    ),
  });

  const onClick = useCallback((event: MouseEvent) => {
    event.preventDefault();
    navigate(href!);
  }, [navigate]);

  return (
    <a href={href} className={finalClassName} onClick={onClick} {...rest}>
      {children}
    </a>
  );
};

export default SiderLink;
