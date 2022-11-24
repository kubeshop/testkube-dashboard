import {FormInstance} from 'antd';

import {Variable} from '@models/variable';

import VariablesFormList from '../../VariablesFormList';

type VariablesListProps = {
  data: Variable[];
  form: FormInstance;
};

const VariablesList: React.FC<VariablesListProps> = props => {
  const {data, form} = props;

  return <VariablesFormList data={data} form={form} />;
};

export default VariablesList;
