import {FC, PropsWithChildren} from 'react';

import {FormRowWrapper} from './FormRow.styled';

type FormRowProps = {
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around';
};

export const FormRow: FC<PropsWithChildren<FormRowProps>> = ({children, justify = 'start'}) => {
  return <FormRowWrapper $justify={justify}>{children}</FormRowWrapper>;
};
