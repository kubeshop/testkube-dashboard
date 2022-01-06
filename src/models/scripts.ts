export type Script = {
  content: ScriptContent;
  created: ScriptCreationDate;
  name: ScriptName;
  type: ScriptType;
};

export type ScriptName = string;
export type ScriptContent = string;

export type ScriptType = 'postman/collection' | 'cypress/project' | 'curl/test';

export type ScriptCreationDate = Date;

interface ScriptsState {
  isLoading?: boolean;
  scriptsList: Script[];
  filters: {textSearch: string};
  totals: {};
  filtered: {};
  selectedScript: Script | null;
}

export type {ScriptsState};
