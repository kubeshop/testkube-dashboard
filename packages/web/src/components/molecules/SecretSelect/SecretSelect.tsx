import {useMemo} from 'react';

import {CreatableSingleSelect} from '@atoms/ReactSelect';
import SecretOption from '@atoms/ReactSelect/CustomComponents/SecretOption';

import {useLastCallback} from '@hooks/useLastCallback';

import {Option} from '@models/form';

import {useGetClusterSecretsQuery} from '@services/secrets';

type SecretSelectProps = {
  value?: Option;
  onChange?: (value: Option) => void;
  onCreateSecret?: (input: string) => void;
  options?: Option[];
  placeholder?: string;
  validation?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  disabled?: boolean;
  stylePlaceholderAsValue?: boolean;
};

const SecretSelect: React.FC<SecretSelectProps> = props => {
  const {onChange, onCreateSecret, value, options, validation, menuPlacement, disabled, stylePlaceholderAsValue} =
    props;

  const {data, isFetching} = useGetClusterSecretsQuery();

  const change = useLastCallback((newValue: Option) => onChange?.(newValue));

  const formattedOptions: Option[] = useMemo(() => {
    return (
      data?.map(item => {
        const keyValuePair = `${item.name}:${item.key}`;
        return {label: keyValuePair, value: keyValuePair};
      }) || []
    );
  }, [options, data]);

  return (
    <CreatableSingleSelect
      value={value}
      onChange={change}
      placeholder="Select or create a secret"
      formatCreateLabel={(input: string) => {
        return `Create: Store ${input} as a secret in the Kubernetes secret store`;
      }}
      onCreateOption={onCreateSecret}
      options={formattedOptions}
      CustomOptionComponent={SecretOption}
      isLoading={isFetching}
      validation={validation}
      menuPlacement={menuPlacement}
      dataTest="secrets"
      disabled={disabled}
      stylePlaceholderAsValue={stylePlaceholderAsValue}
    />
  );
};

export default SecretSelect;
