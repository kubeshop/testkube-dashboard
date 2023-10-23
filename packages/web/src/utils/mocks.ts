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
