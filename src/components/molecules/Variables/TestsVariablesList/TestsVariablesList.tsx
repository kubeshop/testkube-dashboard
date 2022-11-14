import {Form, FormInstance} from 'antd';

import {Variable} from '@models/variable';

import VariablesFormList from '../../VariablesFormList';

type VariablesListProps = {
  data: Variable[];
  form: FormInstance;
  onFinish: (values: any) => void;
};

const VariablesList: React.FC<VariablesListProps> = props => {
  const {data, form, onFinish} = props;

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFieldsChange={(_: any) => {
        if (_[0]) {
          const action = _[0];

          const actionValue = action.value;

          if (!Array.isArray(actionValue)) {
            const actionFieldIndex = action.name[1];
            const isTypeChanged = action.name[2] === 'type';
            const neededFieldValue = form.getFieldValue('variables-list')[actionFieldIndex];

            if (isTypeChanged) {
              try {
                if (actionValue === 'secretRef') {
                  delete neededFieldValue.value;
                } else {
                  delete neededFieldValue.secretRefName;
                  delete neededFieldValue.secretRefKey;
                }
              } catch (err) {
                // eslint-disable-next-line no-console
                console.log('err: ', err);
              }
            }
          }
        }
      }}
    >
      <VariablesFormList data={data} form={form} />
    </Form>
  );
};

export default VariablesList;
