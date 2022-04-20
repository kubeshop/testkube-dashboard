export type LabelKey = string;
export type LabelValue = string;

export type Label = {
  key: LabelKey;
  value: LabelValue;
};

export type LabelMap = Record<LabelKey, LabelValue>;

export type LabelArray = Label[];

interface LabelsState {
  labelsObject: LabelMap;
}

export type {LabelsState};
