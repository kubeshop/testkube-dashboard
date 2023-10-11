import React, {KeyboardEvent, useRef} from 'react';
import {OptionProps} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import usePressEnter from '@hooks/usePressEnter';

import {Option} from '@models/form';

import CustomSingleValue from '../CustomComponents/SingleValue';
import {DefaultDropdownIndicator, DefaultOptionComponent} from '../DefaultComponents';
import {customSingleValueStyles, customTheme} from '../ReactSelect.styled';

type SingleSelectProps = {
  options?: Option[];
  placeholder: string;
  formatCreateLabel: (inputString: string) => string;
  value?: Option;
  defaultValue?: Option;
  onChange?: (value: any) => void;
  validateCreation?: (inputValue: string) => boolean;
  CustomOptionComponent?: (props: OptionProps<Option>) => JSX.Element;
  isLoading?: boolean;
  validation?: boolean;
  dataTest?: string;
  disabled?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  stylePlaceholderAsValue?: boolean;
};

const CreatableSingleSelect: React.FC<SingleSelectProps> = props => {
  const {
    options,
    placeholder,
    formatCreateLabel,
    value,
    defaultValue,
    onChange,
    validateCreation,
    CustomOptionComponent = DefaultOptionComponent,
    validation,
    dataTest,
    disabled = false,
    menuPlacement = 'bottom',
    stylePlaceholderAsValue = false,
  } = props;

  const ref = useRef(null);

  const onEvent = usePressEnter();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (validateCreation) {
      // @ts-ignore
      if (!validateCreation(ref.current.props.inputValue)) {
        event.preventDefault();
      }
    } else {
      event.preventDefault();
    }
  };

  return (
    <CreatableSelect
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      menuPlacement={menuPlacement}
      isClearable={false}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      createOptionPosition="first"
      onKeyDown={event => {
        onEvent(event, () => {
          handleKeyDown(event);
        });
      }}
      formatCreateLabel={formatCreateLabel}
      theme={customTheme}
      styles={customSingleValueStyles(validation, stylePlaceholderAsValue)}
      components={{
        Option: CustomOptionComponent,
        DropdownIndicator: DefaultDropdownIndicator,
        SingleValue: CustomSingleValue,
      }}
      data-test={dataTest}
      isDisabled={disabled}
    />
  );
};
export default CreatableSingleSelect;
