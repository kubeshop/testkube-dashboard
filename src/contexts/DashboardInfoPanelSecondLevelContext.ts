import {createContext} from 'react';

type DashboardInfoPanelSecondLevelContextProps = {
  onDataChange: (data: any) => void;
  data: any;
};

const DashboardInfoPanelSecondLevelContext = createContext<DashboardInfoPanelSecondLevelContextProps>({
  onDataChange: () => {},
  data: {
    status: undefined,
  },
});

export default DashboardInfoPanelSecondLevelContext;
