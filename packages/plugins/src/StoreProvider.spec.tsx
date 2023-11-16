import {FC, PropsWithChildren} from 'react';

import {render} from '@testing-library/react';

import {StoreProvider} from './StoreProvider';

describe('plugins', () => {
  describe('StoreProvider', () => {
    const mock = () =>
      jest.fn(() => {
        let i = 0;
        return [
          ({children}) => {
            i += 1;
            return <div data-testid={`store-${i}`}>{children}</div>;
          },
          {},
        ] as [FC<PropsWithChildren<{}>>, any];
      });

    it('should render properly', async () => {
      const fn = mock();
      const result = render(<StoreProvider store={fn} />);
      expect(fn).toHaveBeenCalledTimes(1);
      expect(await result.findByTestId('store-1')).toBeTruthy();
    });

    it('should pass static dependencies down', async () => {
      const fn = mock();
      render(<StoreProvider store={fn} dependencies={['abc', 'def']} />);
      expect(fn.mock.calls).toEqual([[undefined, ['abc', 'def']]]);
    });

    it('should pass dynamic dependencies on each render', async () => {
      const fn = mock();
      let value1 = 'abc';
      const deps = () => [value1, 'def'];
      const result = render(<StoreProvider store={fn} dependencies={deps} />);
      value1 = 'xyz';
      result.rerender(<StoreProvider store={fn} dependencies={deps} />);
      expect(fn.mock.calls).toEqual([
        [undefined, ['abc', 'def']],
        [undefined, ['xyz', 'def']],
      ]);
    });

    it('should pass static initial state down', async () => {
      const fn = mock();
      render(<StoreProvider store={fn} initialState={{key1: 'value1', key2: 'value2'}} />);
      expect(fn.mock.calls).toEqual([[{key1: 'value1', key2: 'value2'}, undefined]]);
    });

    it('should pass dynamic initial state on each render', async () => {
      const fn = mock();
      let value1 = 'value1';
      const state = () => ({key1: value1, key2: 'value2'});
      const result = render(<StoreProvider store={fn} initialState={state} />);
      value1 = 'valueX';
      result.rerender(<StoreProvider store={fn} initialState={state} />);
      expect(fn.mock.calls).toEqual([
        [{key1: 'value1', key2: 'value2'}, undefined],
        [{key1: 'valueX', key2: 'value2'}, undefined],
      ]);
    });
  });
});
