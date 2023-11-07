const ExternalLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = props => {
  const {children, ...rest} = props;

  return (
    <a target="_blank" rel="noopener" {...rest}>
      {children}
    </a>
  );
};

export default ExternalLink;
