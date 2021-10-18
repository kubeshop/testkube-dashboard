  
export const filterTestsExecution = (tests: any, _filters: any) => {
  let filteredTestsExecution = tests;

  if (
    _filters?.filter?.includes('error') ||
    _filters?.filter?.includes('success') ||
    _filters?.filter?.includes('pending')
  ) {
    const filteredTests = filteredTestsExecution?.results?.filter((test: any) =>
      _filters?.filter?.includes(test.status)
    );

    if (filteredTests.length > 0) {
      filteredTestsExecution = {
        ...filteredTestsExecution,
        results: filteredTests,
      };
    } else {
      const filtersNames = Object.values(_filters?.filter);
      filteredTestsExecution = {
        ...filteredTestsExecution,
        results: filteredTests,
        errorMessage: `No ${filtersNames} tests found!`,
      };
    }
  }




  return filteredTestsExecution;
};
