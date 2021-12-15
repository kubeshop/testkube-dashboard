export type DashboardEntityType = 'tests' | 'scripts' | 'executions';

export enum DashboardEntitiesTypesEnum {
  Tests = 'tests',
  Scripts = 'scripts',
  Executions = 'executions',
}

export type DashboardBlueprintProps = {
  entityType: DashboardEntityType;
};

export type DashboardEntity = {
  route?: string;
  pageTitle?: string;
  entityType?: DashboardEntityType;
  reduxEntity?: string;
  component: (props: Partial<DashboardEntity>) => JSX.Element;
};
