export const mockDashboardContextValue = {
  navigate: jest.fn(),
  location: {pathname: '/testroute', search: '', key: '', hash: '', location: '', state: {}},
  baseUrl: '',
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

export const mockNavigationContextValue = {
  basename: 'basename',
  navigator: {
    createHref: jest.fn(),
    go: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  },
  static: true,
};
