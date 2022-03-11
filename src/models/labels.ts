export type LabelKey = string;
export type LabelValue = string;

export type Label = {
  key: LabelKey;
  value: LabelValue;
};

export type LabelsObject = Record<LabelKey, LabelValue>;
export type LabelsArray = Label[];

interface LabelsState {
  labelsObject: LabelsObject;
}

export type {LabelsState};
