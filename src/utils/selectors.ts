type SelectorItem = {key: string; value: string};
type SelectorItemInput = {key?: string; value?: string | number};
type SelectorDictionary = Record<string, string>;

const toString = (v: string | number | undefined): string => `${v ?? ''}`.trim();

const buildDictionary = (mapping: SelectorItemInput[]): SelectorDictionary =>
  mapping
    .filter(x => x.key)
    .reduce((acc, {key, value}) => ({...acc, [key!.trim()]: toString(value)}), {} as SelectorDictionary);

export const encodeSelector = (mapping: SelectorDictionary = {}): string =>
  Object.entries(mapping)
    .map(([k, v]) => (v ? `${k}=${v}` : k))
    .join(',');

export const decodeSelector = (selector: string = ''): SelectorDictionary =>
  selector
    .split(',')
    .map(v => v.split('=').map(x => x.trim()))
    .reduce((acc, [key, value]) => ({...acc, [key.trim()]: toString(value)}), {});

export const encodeSelectorArray = (mapping: SelectorItemInput[]): string => encodeSelector(buildDictionary(mapping));

export const decodeSelectorArray = (selector = ''): SelectorItem[] =>
  Object.entries(decodeSelector(selector)).map(([key, value]) => ({key, value}));
