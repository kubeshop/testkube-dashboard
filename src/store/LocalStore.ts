import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {shallow} from 'zustand/shallow';

import createTriggersSlice, {TriggersSlice} from './TriggersSlice';

/* Create store. For more information,
check https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md#basic-usage  */
const useLocalStore = create<TriggersSlice>()(
  devtools(
    (...a) => ({
      ...createTriggersSlice(...a),
    }),
    {name: 'Local Store Zustand', enabled: process.env.NODE_ENV === 'development'}
  )
);

export const useShallowLocalStore = <U>(selector: (state: TriggersSlice) => U) => useLocalStore(selector, shallow);

export default useLocalStore;
