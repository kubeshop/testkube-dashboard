export type Script = {
  content: ScriptContent;
  created: ScriptCreationDate;
  name: ScriptName;
  type: ScriptType;
};

export type ScriptName = string;
export type ScriptContent = string;

export type ScriptType = 'postman/collection' | 'cypress/project' | 'curl/test' | 'test/curl';

export type ScriptCreationDate = Date;

interface ScriptsState {
  isLoading?: boolean;
  scriptsList: Script[];
  filters: {textSearch: string; type: string; pageSize: number; tags: string; createdAt: null};
  totals: {};
  filtered: {};
  selectedScript: Script | null;
}

export type {ScriptsState};
