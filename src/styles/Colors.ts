enum Colors {
  mainBackground = '#111827',
  slate50 = '#F8FAFC',
  slate100 = '#F1F5F9',
  slate200 = '#E2E8F0',
  slate300 = '#CBD5E1',
  slate400 = '#94A3B8',
  slate500 = '#64748B',
  slate600 = '#475569',
  slate700 = '#334155',
  slate800 = '#1E293B',
  slate200halfalpha = 'rgba(226,232,240, 0.5)',
  slate800halfalpha = 'rgba(30,41,59, 0.5)',
  slate801 = 'rgba(30, 41, 59, 0.5)',
  slate800disabled = 'rgba(30, 41, 59, 0.5)',
  slate850 = '#0f172a',
  slate900 = '#0F172A',

  sky900 = '#0C4A6E',
  sky700 = '#0369A1',
  sky600 = '#0284C7',
  sky500 = '#0EA5E9',
  sky400 = '#38BDF8',
  sky300 = '#7DD3FC',

  pink900 = '#831843',
  pink800 = '#9D174D',
  pink700 = '#BE185D',
  pink600 = '#DB2777',
  pink500 = '#EC4899',
  pink300 = '#F9A8D4',

  lime900 = '#365314',
  lime700 = '#4D7C0F',
  lime600 = '#65A30D',
  lime500 = '#84CC16',
  lime400 = '#A3E635',
  lime300 = '#BEF264',

  yellow900 = '#713F12',
  yellow500 = '#EAB308',
  yellow400 = '#FACC15',
  yellow300 = '#FDE047',

  cyan900 = '#164E63',
  cyan500 = '#06B6D4',
  cyan300 = '#67E8F9',
  cyan50 = '#ECFEFF',

  blue500 = '#3b82f6',

  emerald500 = '#10B981',

  teal300 = '#5eead4',
  teal900 = '#164e63',

  indigo50 = '#EEF2FF',
  indigo100 = '#E0E7FF',
  indigo200 = '#C7D2FE',
  indigo300 = '#A5B4FC',
  indigo400 = '#818CF8',
  indigo600 = '#4F46E5',
  indigo900 = '#312e81',

  amber100 = '#FEF3C7',
  amber200 = '#FDE68A',
  amber300 = '#FCD34D',
  amber400 = '#fbbf24',
  amber500 = '#F59E0B',
  amber600 = '#D97706',
  amber900 = '#78350F',
  amber90099 = '#78350F99',

  violet400 = '#a78bfa',

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
  greyBGSecondary = '#1d1d1d',

  // Notifications
  greenOkay = '#09B89D',
  greenOkayCompliment = '#B2DFD3',

  successGreen = '#94D89C',
  errorRed = '#DB539C',
  lightGrey = '#DEDEDE',
  darkGrey = '#393939',

  redError = '#E65A6D',
  redErrorCompliment = '#F4BAB8',

  whitePure = '#FFFFFF',
  blackPure = '#000000',
  blackPearl = '#111D2C',

  blue6 = '#1890FC', // Daybreak Blue
  blue10 = '#B7E3FA',

  highlightGreen = '#33BCB7',

  purple = '#7984F4',
  purpleSecondary = '#4628AF',

  selectionGradient = 'linear-gradient(90deg, #3C9AE8 0%, #84E2D8 100%)',
  selectionGradientHover = 'linear-gradient(90deg, #3C9AE8 50%, #84E2D8 100%)',
  highlightGradient = 'linear-gradient(90deg, #113536 0%, #000000 100%)',
  highlightGradientHover = 'linear-gradient(90deg, #113536 50%, #000000 100%)',
  diffBackground = '#2B2611',
  diffBackgroundHover = '#27220F',

  dashboardTableBackground = '#1D1D1D',
  greyBorder = '#434343',
  greyHover = '#303030',
  greyDisabled = '#5A5A5A',

  rose100 = '#FFE4E6',
  rose200 = '#FECDD3',
  rose300 = '#FDA4AF',
  rose400 = '#fb7185',
  rose500 = '#F43F5E',
  rose600 = '#e11d48',
  rose700 = '#be123c',
  rose800 = '#9f1239',
  rose900 = '#881337',
}

export enum BackgroundColors {
  mainBackground = Colors.mainBackground,
  darkThemeBackground = Colors.blackPure,
}

export enum FontColors {
  lightThemeMainFont = Colors.blackPure,
  darkThemeMainFont = Colors.grey450,
  elementSelectTitle = Colors.blue6,
  resourceRowHighlight = Colors.highlightGreen,
  grey = Colors.grey700,
  error = Colors.redError,
  afford = Colors.greenOkay,
}

export enum StatusColors {
  passed = Colors.lime400,
  success = Colors.lime400,
  failed = Colors.pink600,
  error = Colors.pink600,
  running = Colors.sky400,
  pending = Colors.lightGrey,
  queued = Colors.lightGrey,
  neverRun = Colors.whitePure,
  cancelled = Colors.pink600,
  timeout = Colors.pink600,
  aborted = Colors.pink600,
  aborting = Colors.pink600,
}

export enum SecondaryStatusColors {
  passed = Colors.lime700,
  success = Colors.lime700,
  failed = Colors.pink800,
  error = Colors.pink800,
  running = Colors.sky700,
  cancelled = Colors.pink800,
  timeout = Colors.pink800,
  aborted = Colors.pink800,
  aborting = Colors.pink800,
}

export enum BorderColors {
  greyBorder = Colors.darkGrey,
}

const borders = {
  greyBorder: `1px solid ${BorderColors.greyBorder}`,
};

export default Colors;
