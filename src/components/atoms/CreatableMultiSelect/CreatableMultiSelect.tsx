import React, {KeyboardEvent, useRef} from 'react';
import {MultiValueGenericProps, OptionProps} from 'react-select';
import CreatableSelect from 'react-select/creatable';

import {Option} from '@models/form';

import usePressEnter from '@src/hooks/usePressEnter';

import {customStyles, customTheme} from './CreatableMultiSelect.styled';
import {DefaultMultiValueLabel, DefaultMultiValueRemove, DefaultOptionComponent} from './DefaultComponents';

type MultiSelectProps = {
  options?: Option[];
  placeholder: string;
  formatCreateLabel: (inputString: string) => string;
  defaultValue?: Option[];
  onChange: (value: readonly Option[]) => void;
  validateCreation?: (inputValue: string) => boolean;
  CustomOptionComponent?: (props: OptionProps<Option>) => JSX.Element;
  CustomMultiValueLabelComponent?: (props: MultiValueGenericProps<Option>) => JSX.Element;
  isLoading?: boolean;
};

const CreatableMultiSelect: React.FC<MultiSelectProps> = props => {
  const {
    options,
    placeholder,
    formatCreateLabel,
    defaultValue,
    onChange,
    validateCreation,
    CustomOptionComponent = DefaultOptionComponent,
    CustomMultiValueLabelComponent = DefaultMultiValueLabel,
    isLoading = false,
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
      defaultValue={defaultValue}
      isMulti
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
      styles={customStyles}
      components={{
        Option: CustomOptionComponent,
        MultiValueLabel: CustomMultiValueLabelComponent,
        MultiValueRemove: DefaultMultiValueRemove,
      }}
      isLoading={isLoading}
    />
  );
};
export default CreatableMultiSelect;
