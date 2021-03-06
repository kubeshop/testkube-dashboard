import {renderFormItems} from '@utils/form';

import {secondStepFormFields} from '../utils';

const SecondStep: React.FC<any> = props => {
  const {form} = props;

  return <>{renderFormItems(secondStepFormFields, {form})}</>;
};

export default SecondStep;
