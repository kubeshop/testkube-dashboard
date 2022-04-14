import {createContext} from 'react';

type DashboardInfoPanelContextProps = {
  onDataChange: (data: any) => void;
  size: {
    width?: number;
    height?: number;
  };
};

const DashboardInfoPanelContext = createContext<DashboardInfoPanelContextProps>({
  onDataChange: () => {},
  size: {},
});

export default DashboardInfoPanelContext;
