export type ScriptName = string;

export type ScriptType = 'postman/collection';

export type ScriptCreationDate = Date;

export type Script = {
  content: string;
  created: ScriptCreationDate;
  name: ScriptName;
  type: ScriptType;
};

interface ScriptsState {
  isLoading?: boolean;
  scriptsList: Script[];
  filters: {
    page: number;
    pageSize: number;
  };
}

export type {ScriptsState};
