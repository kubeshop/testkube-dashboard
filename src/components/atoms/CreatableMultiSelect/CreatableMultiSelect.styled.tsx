import styled from 'styled-components';

import Colors from '@styles/Colors';

export const StyledOption = styled.div`
  padding: 6px 12px;

  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${Colors.slate700};
  }
`;

export const StyledMultiLabel = styled.div`
  padding: 3px 5px;
`;

export const customStyles = {
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
  multiValueLabel: (styles: any) => ({
    ...styles,
    color: Colors.slate200,
    fontWeight: 400,
    fontSize: 12,
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
  option: (styles: any) => ({
    ...styles,
    padding: '6px 12px',
    fontWeight: 400,
    fontSize: 14,
    color: Colors.slate200,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: Colors.slate700,
    },
  }),
};

export const customTheme = (theme: any) => ({
  ...theme,
  borderRadius: 4,
  colors: {
    ...theme.colors,
    primary: Colors.indigo400,
    primary25: Colors.slate700,
    neutral30: Colors.slate600,
  },
});
