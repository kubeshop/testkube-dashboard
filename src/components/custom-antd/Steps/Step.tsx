import {StepProps as AntdStepProps, Steps} from 'antd';

const {Step: AntdStep} = Steps;

const Step: React.FC<AntdStepProps> = props => {
  return <AntdStep {...props} />;
};

export default Step;
