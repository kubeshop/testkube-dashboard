import {DashboardBlueprintType} from './dashboard';

export type AddEntityBlueprint = {
  pageTitle: string;
  gradient: string;
  route: string;
  wizardTitle: string;
  wizardType: 'addTest';
  entityType: DashboardBlueprintType;
  onCancel?: () => any;
  onSave?: () => any;
  onRun?: () => any;
};
