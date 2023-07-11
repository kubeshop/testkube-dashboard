import {remapExecutors} from './executors';

describe('executors', () => {
  describe('remapExecutors', () => {
    it('should correctly remap executors with types field', () => {
      const executors = [
        {
          executor: {
            types: ['exec1', 'exec2', 'exec3'],
          },
        },
        {
          executor: {
            types: ['exec4', 'exec5', 'exec6'],
          },
        },
      ];
      const result = remapExecutors(executors);

      expect(result).toEqual([
        {label: 'exec1', value: 'exec1'},
        {label: 'exec2', value: 'exec2'},
        {label: 'exec3', value: 'exec3'},
        {label: 'exec4', value: 'exec4'},
        {label: 'exec5', value: 'exec5'},
        {label: 'exec6', value: 'exec6'},
      ]);
    });

    it('should correctly remap executors with executorType field', () => {
      const executors = [
        {
          executor: {
            executorType: 'exec1',
          },
        },
        {
          executor: {
            executorType: 'exec2',
          },
        },
      ];
      const result = remapExecutors(executors);

      expect(result).toEqual([
        {label: 'exec1', value: 'exec1'},
        {label: 'exec2', value: 'exec2'},
      ]);
    });

    it('should return an array of the executors if it does not have types or executorType fields', () => {
      const executors = [];
      const result = remapExecutors(executors);

      expect(result).toEqual([]);
    });
  });
});
