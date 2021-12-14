export type ScriptName = string;
export type ScriptType = 'postman/collection';
export type ScriptCreationDate = Date;

export interface IScript {
  content: string;
  created: ScriptCreationDate;
  name: ScriptName;
  type: ScriptType;
}

export interface IScriptsState {
  isLoading?: boolean;
  scriptsList: IScript[];
}
