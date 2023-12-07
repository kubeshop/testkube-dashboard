import {useCallback} from 'react';

import {Button} from '@custom-antd';

import {Entity} from '@models/entityMap';

import * as S from './KeyValueInput.styled';

type OptionsType = {
  key: string;
  label: string;
  value: string;
};

type KeyValueInputProps = {
  index: number;
  itemKey: string;
  itemValue: string;
  keyOptions: OptionsType[];
  labelsMapping: Entity[];
  valuesOptions: OptionsType[];
  setLabelsMapping: React.Dispatch<React.SetStateAction<Entity[]>>;
};

const KeyValueInput: React.FC<KeyValueInputProps> = props => {
  const {index, itemKey, itemValue, keyOptions, labelsMapping, setLabelsMapping, valuesOptions, ...rest} = props;

  const onKeyChange = useCallback(
    (key: string) => {
      setLabelsMapping([
        ...labelsMapping.slice(0, index),
        {key, value: labelsMapping[index].value},
        ...labelsMapping.slice(index + 1),
      ]);
    },
    [index, labelsMapping, setLabelsMapping]
  );

  const onValueChange = useCallback(
    (value: string) => {
      setLabelsMapping([
        ...labelsMapping.slice(0, index),
        {key: labelsMapping[index].key, value},
        ...labelsMapping.slice(index + 1),
      ]);
    },
    [index, labelsMapping, setLabelsMapping]
  );

  const onDeleteRow = useCallback(() => {
    setLabelsMapping([...labelsMapping.slice(0, index), ...labelsMapping.slice(index + 1)]);
  }, [index, labelsMapping, setLabelsMapping]);

  return (
    <S.KeyValueRow {...rest}>
      <S.AutoComplete
        width="220px"
        options={keyOptions}
        onChange={key => onKeyChange(key)}
        value={itemKey}
        data-testid={`key-input-${index}`}
        placeholder="Key"
      />
      <S.AutoComplete
        width="220px"
        options={valuesOptions}
        onChange={value => onValueChange(value)}
        value={itemValue}
        data-testid={`value-input-${index}`}
        placeholder="Value"
      />
      {index > 0 ? (
        <Button $customType="tertiary" onClick={onDeleteRow} data-testid={`delete-row-${index}`}>
          &#10005;
        </Button>
      ) : (
        <S.EmptyButton />
      )}
    </S.KeyValueRow>
  );
};

export default KeyValueInput;
