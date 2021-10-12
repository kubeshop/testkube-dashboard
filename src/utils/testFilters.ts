import {getDate, getTodayTests} from './formatDate';

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

  if (_filters?.dateFilter) {
    const filteredTestsIntervals = filteredTestsExecution?.results?.filter(
      (test: any) => getDate(test.startTime) === getDate(_filters?.dateFilter)
    );

    if (filteredTestsIntervals.length > 0) {
      filteredTestsExecution = {...filteredTestsExecution, results: filteredTestsIntervals};
    } else {
      filteredTestsExecution = {
        ...filteredTestsExecution,
        results: filteredTestsIntervals,
        errorMessage: 'No tests found for the selected date!',
      };
    }
  }

  if (_filters?.filter?.includes('today')) {
    const todayTests = getTodayTests(filteredTestsExecution);

    const todayFilteredTests = filteredTestsExecution?.results?.filter(
      (test: any) => getDate(test.startTime) === getDate(todayTests)
    );

    if (todayFilteredTests.length > 0) {
      filteredTestsExecution = {...filteredTestsExecution, results: todayFilteredTests};
    } else {
      filteredTestsExecution = {
        ...filteredTestsExecution,
        results: todayFilteredTests,
        errorMessage: 'No tests were executed today!',
      };
    }
  }

  return filteredTestsExecution;
};
