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

interface TestsState {
  isLoading?: boolean;
  dataList: Script[];
  filters: {textSearch: string; type: string; pageSize: number; page: number; tags: []; createdAt: null};
  totals: {};
  filtered: {};
  selectedTest: Script | null;
}

export type {TestsState};
