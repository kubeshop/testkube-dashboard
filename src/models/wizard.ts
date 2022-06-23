export type WizardType = 'addTest';

export type WizardComponentProps = {
  wizardTitle: string;
  onCancel: () => void;
};

export type Step = {
  title: string;
  description?: string;
};
