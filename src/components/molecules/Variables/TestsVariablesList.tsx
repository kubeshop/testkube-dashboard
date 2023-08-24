import {FC} from 'react';

import {FormInstance} from 'antd';

import type {VariableInForm} from '@models/variable';

import {VariablesFormList} from '@molecules/VariablesFormList';

type VariablesListProps = {
  data: VariableInForm[];
  form: FormInstance;
};

export const VariablesList: FC<VariablesListProps> = props => {
  const {data, form} = props;

  return <VariablesFormList data={data} form={form} />;
};
