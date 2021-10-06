import { getDate, getLatestDate } from "./formatDate";

export const filterTestsExecution = (tests: any, _filters: string[] = ["all"]) => {
    let filteredTestsExecution = tests;


    if ((_filters.includes('error') || _filters.includes('success') || _filters.includes('pending')) && !_filters.includes('all')) {
        const filteredTests = filteredTestsExecution?.results?.filter((test: any) => _filters.includes(test.status));
        filteredTestsExecution = { ...filteredTestsExecution, results: filteredTests };
    }

    if (_filters?.includes("latest") && !_filters.includes('all')) {

        const latestdate = getLatestDate(filteredTestsExecution);

        const lastTests = filteredTestsExecution?.results?.filter((test: any) => getDate(test.startTime) === getDate(latestdate));

        filteredTestsExecution = { ...filteredTestsExecution, results: lastTests };
    }

  
    return filteredTestsExecution;
};