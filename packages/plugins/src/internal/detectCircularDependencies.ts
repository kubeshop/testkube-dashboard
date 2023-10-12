interface CircularReport<T> {
  from: T;
  through: T;
}

// TODO: Optimize
export function detectCircularDependencies<T>(map: Map<T, Set<T>>): CircularReport<T>[] {
  const reports: CircularReport<T>[] = [];
  Array.from(map.keys()).forEach(plugin => {
    Array.from(map.get(plugin)!).forEach(dep => {
      let furtherDeps = map.get(dep)!;
      let nextDeps = new Set<T>();
      let end = false;
      while (!end) {
        nextDeps = new Set(Array.from(furtherDeps).flatMap(x => [x, ...map.get(x)!]));
        end = nextDeps.size === furtherDeps!.size;
        furtherDeps = nextDeps;
      }
      if (nextDeps.has(plugin)) {
        reports.push({from: plugin, through: dep});
      }
    });
  });

  return reports;
}
