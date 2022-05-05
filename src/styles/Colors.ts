enum Colors {
  // Greys
  grey1000 = '#141414',
  grey900 = '#3A4344',
  grey800 = '#7B8185',
  grey700 = '#93989C',
  grey500 = '#C5C8CB',
  grey450 = '#DBDBDB',
  grey400 = '#DBE0DE',
  grey200 = '#F3F5F4',
  grey100 = '#F9FAFA',
  grey7 = '#7D7D7D', // gray, gray 7 https://www.figma.com/file/3UVW3KVNob7QjgvH62blGU/add-left-and-right-toolbars?node-id=3%3A5926
  grey3 = '#262626', // gray, gray 3
  greySecondary = '#ADADAD',
  greyCode = '#DADADA',
  greyBG = '#434343',

  // Notifications
  greenOkay = '#09B89D',
  greenOkayCompliment = '#B2DFD3',

  yellowWarning = '#FFE17F',
  yellowWarningCompliment = '#FFF3CA',
  yellow7 = '#E8D639',
  yellow10 = '#FAFAB5',

  successGreen = '#94D89C',
  errorRed = '#DB539C',
  lightGrey = '#DEDEDE',
  darkGrey = '#393939',

  redError = '#E65A6D',
  redErrorCompliment = '#F4BAB8',

  whitePure = '#FFFFFF',
  blackPure = '#000000',
  blackPearl = '#111D2C',

  cyan = '#58D1C9',
  cyan7 = '#33BCB7',
  volcano = '#F3956A',

  blue6 = '#1890FC', // Daybreak Blue
  blue10 = '#B7E3FA',

  highlightGreen = '#33BCB7',

  purple = '#7984F4',

  selectionGradient = 'linear-gradient(90deg, #3C9AE8 0%, #84E2D8 100%)',
  selectionGradientHover = 'linear-gradient(90deg, #3C9AE8 50%, #84E2D8 100%)',
  highlightGradient = 'linear-gradient(90deg, #113536 0%, #000000 100%)',
  highlightGradientHover = 'linear-gradient(90deg, #113536 50%, #000000 100%)',
  diffBackground = '#2B2611',
  diffBackgroundHover = '#27220F',

  dashboardTableBackground = '#1D1D1D',
  greyBorder = '#434343',
  greyHover = '#303030',
}

export enum BackgroundColors {
  lightThemeBackground = Colors.whitePure,
  darkThemeBackground = Colors.blackPure,
  previewModeBackground = Colors.cyan,
  clusterModeBackground = Colors.volcano,
}

export enum FontColors {
  lightThemeMainFont = Colors.blackPure,
  darkThemeMainFont = Colors.grey450,
  elementSelectTitle = Colors.blue6,
  resourceRowHighlight = Colors.highlightGreen,
  grey = Colors.grey700,
  error = Colors.redError,
  afford = Colors.greenOkay,
  warning = Colors.yellowWarning,
}

export enum StatusColors {
  passed = Colors.successGreen,
  success = Colors.successGreen,
  failed = Colors.errorRed,
  error = Colors.errorRed,
  running = Colors.lightGrey,
  pending = Colors.lightGrey,
  queued = Colors.lightGrey,
  neverRun = Colors.whitePure,
}

export enum BorderColors {
  greyBorder = Colors.darkGrey,
}

const borders = {
  greyBorder: `1px solid ${BorderColors.greyBorder}`,
};

export default Colors;
