export type ScriptName = string;
export type ScriptContent = string;

export type ScriptType = 'postman/collection' | 'cypress/project' | 'curl/test' | 'test/curl';

export type ScriptCreationDate = Date;

export type Script = {
  content: ScriptContent;
  created: ScriptCreationDate;
  name: ScriptName;
  type: ScriptType;
};

interface ScriptsState {
  isLoading?: boolean;
  scriptsList: Script[];
  filters: {textSearch: string; type: string; pageSize: number; page: number; tags: []; createdAt: null};
  totals: {};
  filtered: {};
  selectedScript: Script | null;
}

export type {ScriptsState};
