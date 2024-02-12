import React, {KeyboardEvent, useRef} from 'react';
import {MultiValueGenericProps, OptionProps} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import usePressEnter from '@hooks/usePressEnter';

import {Option} from '@models/form';

import Colors from '@src/styles/Colors';

import {customStyles, customTheme} from './CreatableMultiSelect.styled';
import {
  DefaultDropdownIndicator,
  DefaultMultiValueLabel,
  DefaultMultiValueRemove,
  DefaultOptionComponent,
} from './DefaultComponents';

type MultiSelectProps = {
  id?: string;
  options?: Option[];
  placeholder: string;
  formatCreateLabel: (inputString: string) => string;
  value?: Option[];
  defaultValue?: Option[];
  onChange?: (value: readonly Option[]) => void;
  isOptionDisabled?: (value: Option, selectValue: readonly Option[]) => boolean;
  validateCreation?: (inputValue: string) => boolean;
  CustomOptionComponent?: (props: OptionProps<Option>) => JSX.Element;
  CustomMultiValueLabelComponent?: (props: MultiValueGenericProps<Option>) => JSX.Element;
  isLoading?: boolean;
  validation?: boolean;
  dataTest?: string;
  disabled?: boolean;
  menuPlacement?: 'auto' | 'bottom' | 'top';
  stylePlaceholderAsValue?: boolean;
};

const CreatableMultiSelect: React.FC<MultiSelectProps> = props => {
  const {
    id,
    options,
    placeholder,
    formatCreateLabel,
    value,
    defaultValue,
    onChange,
    isOptionDisabled,
    validateCreation,
    CustomOptionComponent = DefaultOptionComponent,
    CustomMultiValueLabelComponent = DefaultMultiValueLabel,
    isLoading = false,
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
      id={id}
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      isMulti
      menuPlacement={menuPlacement}
      isClearable={false}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      isOptionDisabled={isOptionDisabled}
      createOptionPosition="first"
      onKeyDown={event => {
        onEvent(event, () => {
          handleKeyDown(event);
        });
      }}
      formatCreateLabel={formatCreateLabel}
      theme={customTheme}
      styles={{
        ...customStyles(stylePlaceholderAsValue),
        control: (styles, p) => ({
          ...styles,
          borderColor: validation ? Colors.pink500 : 'transparent',
          backgroundColor: p.isDisabled ? '#1e293b80' : Colors.slate800,
          minHeight: '44px',
        }),
      }}
      components={{
        Option: CustomOptionComponent,
        MultiValueLabel: CustomMultiValueLabelComponent,
        MultiValueRemove: DefaultMultiValueRemove,
        DropdownIndicator: DefaultDropdownIndicator,
      }}
      data-test={dataTest}
      isDisabled={disabled}
    />
  );
};
export default CreatableMultiSelect;
