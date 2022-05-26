import {DashboardBlueprintType} from './dashboard';

export type AddEntityWizardTypes = 'addTest';

export type AddEntityBlueprint = {
  pageTitle: string;
  gradient: string;
  route: string;
  wizardTitle: string;
  wizardType: AddEntityWizardTypes;
  entityType: DashboardBlueprintType;
  onCancel?: () => any;
  onSave?: () => any;
  onRun?: () => any;
};
