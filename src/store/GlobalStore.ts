import {create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {shallow} from 'zustand/shallow';

import createTriggersSlice, {TriggersSlice} from './TriggersSlice';

/* Create store. For more information,
check https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md#basic-usage  */
const useGlobalStore = create<TriggersSlice>()(
  devtools(
    (...a) => ({
      ...createTriggersSlice(...a),
    }),
    {name: 'Global Store Zustand', enabled: process.env.NODE_ENV === 'development'}
  )
);

export const useShallowGlobalStore = <U>(selector: (state: TriggersSlice) => U) => useGlobalStore(selector, shallow);

export default useGlobalStore;
