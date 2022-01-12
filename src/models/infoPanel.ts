export type InfoPanelType = string;
export type InfoPanelName = string;

export type InfoPanelComponent = any;

type InfoPanelBlock = {
  type: InfoPanelType;
  name: InfoPanelName;
  component: InfoPanelComponent;
};

export type InfoPanelConfig = InfoPanelBlock[];
