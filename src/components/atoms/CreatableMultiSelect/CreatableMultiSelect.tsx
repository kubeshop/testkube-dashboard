import {KeyboardEvent} from 'react';
import CreatableSelect from 'react-select/creatable';

import {Option} from '@models/form';

import Colors from '@styles/Colors';

import {CustomOption, MultiValueLabel, MultiValueRemove} from './CustomComponents';

type MultiSelectProps = {
  options?: any[];
  placeholder: string;
  formatCreateLabel: (inputString: string) => string;
  defaultValue?: Option[];
  onChange: (value: readonly Option[]) => void;
};

const CreatableMultiSelect: React.FC<MultiSelectProps> = props => {
  const {options, placeholder, formatCreateLabel, defaultValue, onChange} = props;

  const customStyles = {
    input: (styles: any) => ({...styles, color: Colors.slate200, fontWeight: 400}),
    valueContainer: (styles: any) => ({...styles, backgroundColor: Colors.slate800}),
    placeholder: (styles: any) => ({...styles, color: Colors.slate500, fontWeight: 400}),
    control: (styles: any) => ({
      ...styles,
      borderColor: 'transparent',
      backgroundColor: Colors.slate800,
      height: '44px',
    }),
    indicatorSeparator: (styles: any) => ({...styles, width: 0}),
    dropdownIndicator: (styles: any) => ({
      ...styles,
      color: Colors.slate500,
      '&:hover': {
        color: Colors.slate400,
      },
    }),
    menu: (styles: any) => ({...styles, backgroundColor: Colors.slate800}),
    menuList: (styles: any) => ({...styles, padding: 0}),
    multiValue: (styles: any) => ({
      ...styles,
      background: 'transparent',
      border: `1px solid ${Colors.slate700}`,
    }),
    multiValueRemove: (styles: any) => ({
      ...styles,
      '&:hover': {
        backgroundColor: 'transparent',
        cursor: 'pointer',
      },
    }),
    noOptionsMessage: (styles: any) => ({
      ...styles,
      fontWeight: 400,
      color: Colors.slate200,
    }),
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <CreatableSelect
      defaultValue={defaultValue}
      isMulti
      isClearable={false}
      onChange={onChange}
      placeholder={placeholder}
      options={options}
      createOptionPosition="first"
      onKeyDown={handleKeyDown}
      formatCreateLabel={formatCreateLabel}
      theme={theme => ({
        ...theme,
        borderRadius: 4,
        colors: {
          ...theme.colors,
          primary: Colors.indigo400,
          neutral30: Colors.slate600,
        },
      })}
      styles={customStyles}
      components={{Option: CustomOption, MultiValueLabel, MultiValueRemove}}
    />
  );
};
export default CreatableMultiSelect;
