import React, {KeyboardEvent, useRef} from 'react';
import {OptionProps} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import usePressEnter from '@hooks/usePressEnter';

import {Option} from '@models/form';

import CustomSingleValue from '../CustomComponents/SingleValue';
import {DefaultClearIndicator, DefaultOptionComponent} from '../DefaultComponents';
import {customSingleValueStyles, customTheme} from '../ReactSelect.styled';

type SingleSelectProps = {
  options?: Option[];
  placeholder: string;
  formatCreateLabel: (input: string) => string;
  value?: Option;
  defaultValue?: Option;
  onChange?: (value: any) => void;
  onBlur?: (event: any) => void;
  onCreateOption?: (input: string) => void;
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
    onBlur,
    onCreateOption,
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
      isClearable
      onChange={onChange}
      onBlur={onBlur}
      onCreateOption={onCreateOption}
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
        // removing default dropdown indicator
        DropdownIndicator: () => null,
        ClearIndicator: DefaultClearIndicator,
        SingleValue: CustomSingleValue,
      }}
      data-test={dataTest}
      isDisabled={disabled}
      noOptionsMessage={() => null}
    />
  );
};
export default CreatableSingleSelect;
