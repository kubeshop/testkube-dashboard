import {createTriggersSlice} from '@store/triggers';
import {connectStore, createStoreBuilder} from '@store/utils';

const createStore = createStoreBuilder('Dashboard').with(createTriggersSlice).end();

const {use: useStore, init: initializeStore} = connectStore(createStore);

export {useStore, initializeStore};
