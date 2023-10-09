import {useContext} from 'react';

import {MainContext} from '@contexts';

export enum SystemAccess {
  offline = 0,
  system = 1,
  agent = 2,
}

const useCurrentSystemAccess = () => {
  const {isSystemAvailable, isClusterAvailable} = useContext(MainContext);
  if (!isSystemAvailable) {
    return SystemAccess.offline;
  }
  if (!isClusterAvailable) {
    return SystemAccess.system;
  }
  return SystemAccess.agent;
};

export function useSystemAccess(): SystemAccess;
export function useSystemAccess(status: SystemAccess): boolean;
export function useSystemAccess(status?: SystemAccess): SystemAccess | boolean {
  const currentSystemAccess = useCurrentSystemAccess();
  if (status == null) {
    return currentSystemAccess;
  }
  return currentSystemAccess >= status;
}
