import type {SecretRef} from './secretRef';

export type Variable = {
  type: 0 | 1 | 'secretRef' | 'secret' | 'basic' | null;
  key?: string;
  value?: string;
  name: string;
  secretRef?: SecretRef;
};

export type Variables = Record<string, Variable>;

export type VariableInForm = {
  type: 0 | 1 | 'secretRef';
  key: string;
  value?: string;
  secretRefName?: string;
  secretRefKey?: string;
};
