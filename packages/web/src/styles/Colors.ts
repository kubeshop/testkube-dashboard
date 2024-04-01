enum Colors {
  mainBackground = '#111827',
  slate50 = '#F8FAFC',
  slate100 = '#F1F5F9',
  slate200 = '#E2E8F0',
  slate300 = '#CBD5E1',
  slate400 = '#94A3B8',
  slate500 = '#64748B',
  slate600 = '#475569',
  slate600quarteralpha = 'rgba(71,85,105, 0.25)',
  slate700 = '#334155',
  slate800 = '#1E293B',
  slate800halfalpha = 'rgba(30,41,59, 0.5)',
  slate801 = 'rgba(30, 41, 59, 0.5)',
  slate800disabled = 'rgba(30, 41, 59, 0.5)',
  slate850 = '#0f172a',
  slate900 = '#0F172A',
  slate950 = '#0b101d',

  sky50 = '#F0F9FF',
  sky100 = '#E0F2FE',
  sky200 = '#BAE6FD',
  sky300 = '#7DD3FC',
  sky400 = '#38BDF8',
  sky500 = '#0EA5E9',
  sky600 = '#0284C7',
  sky700 = '#0369A1',
  sky800 = '#075985',
  sky900 = '#0C4A6E',

  pink50 = '#FDF2F8',
  pink100 = '#FCE7F3',
  pink200 = '#FBCFE8',
  pink300 = '#F9A8D4',
  pink400 = '#F472B6',
  pink500 = '#EC4899',
  pink600 = '#DB2777',
  pink700 = '#BE185D',
  pink800 = '#9D174D',
  pink900 = '#831843',

  lime50 = '#F7FEE7',
  lime100 = '#ECFCCB',
  lime200 = '#D9F99D',
  lime300 = '#BEF264',
  lime400 = '#A3E635',
  lime500 = '#84CC16',
  lime600 = '#65A30D',
  lime700 = '#4D7C0F',
  lime800 = '#3F6212',
  lime900 = '#365314',

  yellow50 = '#FEFCE8',
  yellow100 = '#FEF9C3',
  yellow200 = '#FEF08A',
  yellow300 = '#FDE047',
  yellow400 = '#FACC15',
  yellow500 = '#EAB308',
  yellow600 = '#CA8A04',
  yellow700 = '#A16207',
  yellow800 = '#854D0E',
  yellow900 = '#713F12',

  cyan50 = '#ECFEFF',
  cyan100 = '#CFFAFE',
  cyan200 = '#A5F3FC',
  cyan300 = '#67E8F9',
  cyan400 = '#22D3EE',
  cyan500 = '#06B6D4',
  cyan600 = '#0891B2',
  cyan700 = '#0E7490',
  cyan800 = '#155E75',
  cyan900 = '#164E63',

  blue500 = '#3b82f6',
  blue6 = '#1890FC', // Daybreak Blue

  emerald500 = '#10B981',
  emerald700 = '#0F766E',
  emerald900 = '#064E3B',

  teal300 = '#5eead4',
  teal900 = '#164e63',

  indigo50 = '#EEF2FF',
  indigo100 = '#E0E7FF',
  indigo200 = '#C7D2FE',
  indigo300 = '#A5B4FC',
  indigo400 = '#818CF8',
  indigo500 = '#6366F1',
  indigo600 = '#4F46E5',
  indigo700 = '#4338CA',
  indigo800 = '#3730A3',
  indigo900 = '#312e81',

  amber50 = '#FFFBEB',
  amber100 = '#FEF3C7',
  amber200 = '#FDE68A',
  amber300 = '#FCD34D',
  amber400 = '#fbbf24',
  amber500 = '#F59E0B',
  amber600 = '#D97706',
  amber700 = '#B45309',
  amber800 = '#92400E',
  amber900 = '#78350F',
  amber90099 = '#78350F99',

  rose100 = '#FFE4E6',
  rose200 = '#FECDD3',
  rose300 = '#FDA4AF',
  rose400 = '#fb7185',
  rose500 = '#F43F5E',
  rose600 = '#e11d48',
  rose700 = '#be123c',
  rose800 = '#9f1239',
  rose900 = '#881337',

  violet400 = '#a78bfa',
  violet800 = '#5B21B6',

  // Greys
  grey1000 = '#141414',
  grey900 = '#3A4344',
  grey800 = '#7B8185',
  grey700 = '#93989C',
  grey500 = '#C5C8CB',
  grey450 = '#DBDBDB',
  grey400 = '#DBE0DE',
  grey300 = '#E1E6E4',
  grey200 = '#F3F5F4',
  grey100 = '#F9FAFA',
  grey7 = '#7D7D7D', // gray, gray 7 https://www.figma.com/file/3UVW3KVNob7QjgvH62blGU/add-left-and-right-toolbars?node-id=3%3A5926
  greyCode = '#DADADA',
  greyBG = '#434343',

  // Notifications
  greenOkay = '#09B89D',

  errorRed = '#DB539C',
  lightGrey = '#DEDEDE',
  darkGrey = '#393939',

  redError = '#E65A6D',

  whitePure = '#FFFFFF',
  blackPure = '#000000',

  highlightGreen = '#33BCB7',

  purple = '#7984F4',

  greyBorder = '#434343',
  greyHover = '#303030',
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
  operational = Colors.lime400,
  partial_outage = Colors.amber500,
  major_outage = Colors.pink600,
  unavailable = Colors.slate700,
  unknown = Colors.slate700,
  critical = Colors.rose500,
  major = Colors.rose500,
  minor = Colors.amber400,
  low = Colors.yellow400,
  info = Colors.slate50,
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
  operational = Colors.lime700,
  partial_outage = Colors.amber800,
  major_outage = Colors.pink800,
  unavailable = Colors.slate900,
  unknown = Colors.slate900,
}

export enum BorderColors {
  greyBorder = Colors.darkGrey,
}

export default Colors;
