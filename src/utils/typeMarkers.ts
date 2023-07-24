type PickKnown<T, U> = Pick<T, {[K in keyof T]: K extends U ? K : never}[keyof T]>;

// Add opaque markers for some values.
// Used for meta-logic in Zustand.

declare const markerSymbol: unique symbol;
export type IsMarked<T> = typeof markerSymbol extends keyof PickKnown<T, typeof markerSymbol> ? T : never;
export type Marked<T> = T extends IsMarked<T> ? T : {readonly [markerSymbol]: T};
export type Mark<T, M extends symbol> = Marked<T> & {readonly [K in M]: typeof markerSymbol};
export type GetMarks<T> = T extends IsMarked<T>
  ? {[K in keyof T]: T[K] extends typeof markerSymbol ? K : never}[keyof T]
  : never;
export type HasMark<T, M extends symbol> = M extends GetMarks<T> ? T : never;
export type UnmarkAll<T> = T extends {[markerSymbol]: infer U} ? U : T;
export type UnmarkEmpty<T> = keyof T extends typeof markerSymbol ? UnmarkAll<T> : T;
export type Unmark<T, M extends symbol> = UnmarkEmpty<Omit<Marked<T>, M>>;
export type UnmarkObject<T, M extends symbol> = {[K in keyof T]: Unmark<T[K], M>};
export type UnmarkAllObject<T> = {[K in keyof T]: UnmarkAll<T[K]>};

export type MatchingMarkKeys<T, M extends symbol> = {
  [K in keyof T]: T[K] extends HasMark<T[K], M> ? K : never;
}[keyof T];
export type NotMatchingMarkKeys<T, M extends symbol> = {
  [K in keyof T]: T[K] extends HasMark<T[K], M> ? never : K;
}[keyof T];
export type ExcludeMark<T, M extends symbol> = Pick<T, NotMatchingMarkKeys<T, M>>;
export type PickMark<T, M extends symbol> = Pick<T, MatchingMarkKeys<T, M>>;
