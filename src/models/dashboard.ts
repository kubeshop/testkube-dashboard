export type DashboardBlueprintType = 'tests' | 'scripts' | 'executions';

export type DashboardBlueprintProps = {
  entityType: DashboardBlueprintType;
};

export type DashboardBlueprint = {
  route?: string;
  pageTitle?: string;
  entityType?: DashboardBlueprintType;
  reduxEntity?: string;
  component: (props: Omit<DashboardBlueprint, 'component'>) => JSX.Element;
};
