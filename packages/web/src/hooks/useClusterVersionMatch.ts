import {satisfies as matchesVersion} from 'semver';

import {useClusterPlugin} from '@plugins/cluster/hooks';

const useClusterVersionMatch = <T>(match: string, defaults?: T): boolean | T => {
  const useClusterDetails = useClusterPlugin.select(x => x.useClusterDetails);
  const clusterVersion = useClusterDetails(x => x.version);
  return clusterVersion == null ? (defaults as T) : matchesVersion(clusterVersion, match);
};

export default useClusterVersionMatch;
