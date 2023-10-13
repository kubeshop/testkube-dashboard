const ExternalLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = props => {
  const {children, ...rest} = props;

  return (
    <a target="_blank" {...rest}>
      {children}
    </a>
  );
};

export default ExternalLink;
