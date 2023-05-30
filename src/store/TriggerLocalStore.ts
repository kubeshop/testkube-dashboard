import { useRef } from "react";
import { create} from 'zustand';
import {devtools} from 'zustand/middleware';
import {shallow} from 'zustand/shallow';
import createTriggersSlice, {TriggersSlice} from './TriggersSlice';

const useTriggerLocalStore = () => {
    const useStoreRef = useRef(
        create<TriggersSlice>()(
            devtools(
              (...a) => ({
                ...createTriggersSlice(...a),
              }),
              {name: 'Local Store Zustand', enabled: process.env.NODE_ENV === 'development'}
            )
          )
    );
    const useStore = useStoreRef.current;
          
    const useShallowLocalStore = <U>(selector: (state: TriggersSlice) => U) => useStore(selector, shallow);

    return [useShallowLocalStore];
}; 

export default useTriggerLocalStore;