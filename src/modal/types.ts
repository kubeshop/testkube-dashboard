import {ReactNode} from 'react';

export interface ModalConfig {
  width: number;
  title: string;
  content: ReactNode;
  footer?: ReactNode;
  dataTestModalRoot?: string;
  dataTestCloseBtn?: string;
}

export interface ModalController {
  open: () => void;
  close: () => void;
  active: boolean;
}
