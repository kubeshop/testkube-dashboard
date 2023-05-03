import {FormInstance} from 'antd';

import {VariableInForm} from '@models/variable';

import VariablesFormList from '../../VariablesFormList';

type VariablesListProps = {
  data: VariableInForm[];
  form: FormInstance;
};

const VariablesList: React.FC<VariablesListProps> = props => {
  const {data, form} = props;

  return <VariablesFormList data={data} form={form} />;
};

export default VariablesList;
