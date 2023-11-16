import {satisfies as matchesVersion} from 'semver';

import {useClusterPlugin} from '@plugins/cluster/hooks';

const useClusterVersionMatch = <T>(match: string, defaults?: T): boolean | T => {
  const useClusterDetails = useClusterPlugin.select(x => x.useClusterDetails);
  const clusterVersion = useClusterDetails(x => x.version);
  const isHash = !/^v?[0-9]+\./.test(clusterVersion || '');
  return clusterVersion == null || isHash ? (defaults as T) : matchesVersion(clusterVersion, match);
};

export default useClusterVersionMatch;
