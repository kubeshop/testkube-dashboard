import {StepsProps as AntdStepsProps} from 'antd';

import {StyledSteps} from './Steps.styled';

const Steps: React.FC<AntdStepsProps> = props => {
  const {children, className = 'testkube-steps', ...rest} = props;

  if (children) {
    return (
      <StyledSteps className={className} {...rest}>
        {children}
      </StyledSteps>
    );
  }

  return <StyledSteps className={className} {...props} />;
};

export default Steps;
