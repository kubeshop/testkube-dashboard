export type TestName = string;
export type TestContent = string;

export type TestType = 'postman/collection' | 'cypress/project' | 'curl/test' | 'test/curl' | 'postman/custom';

export type TestCreationDate = Date;

export type Test = {
  content: TestContent;
  created: TestCreationDate;
  name: TestName;
  type: TestType;
};

interface TestsState {
  isLoading?: boolean;
  dataList: Test[];
  filters: {textSearch: string; type: string; pageSize: number; page: number; selector: []; createdAt: null};
  totals: {};
  filtered: {};
  selectedTest: Test | null;
}

export type {TestsState};
