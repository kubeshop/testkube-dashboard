import {ScriptsState} from '@models/scripts';

const initialScriptsState: ScriptsState = {
  isLoading: false,
  scriptsList: [],
  filters: {
    page: 0,
    pageSize: 10,
  },
};

export default {
  scripts: initialScriptsState,
};
