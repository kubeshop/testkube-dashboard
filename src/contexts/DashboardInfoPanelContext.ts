import {createContext} from 'react';

type DashboardInfoPanelContextProps = {
  onDataChange: (data: any) => void;
};

const DashboardInfoPanelContext = createContext<DashboardInfoPanelContextProps>({
  onDataChange: () => {},
});

export default DashboardInfoPanelContext;
