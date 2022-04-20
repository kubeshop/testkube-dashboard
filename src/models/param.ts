export type ParamKey = string;
export type ParamValue = string;

export type Param = {
  key: ParamKey;
  value: ParamValue;
};

export type ParamMap = Record<ParamKey, ParamValue>;

export type ParamArray = Param[];
