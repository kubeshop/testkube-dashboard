export const mockDashboardContextValue = {
  navigate: jest.fn(),
  location: {pathname: '/testroute', search: '', key: '', hash: '', location: '', state: {}},
  baseUrl: '',
  showLogoInSider: true,
  showSocialLinksInSider: true,
  showTestkubeCloudBanner: true,
};

export const mockModalContextValue = {
  setOpen: jest.fn(),
  setConfig: jest.fn(),
  open: false,
  config: {
    width: 500,
    title: '',
    content: '',
  },
};
