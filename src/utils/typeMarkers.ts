type PickKnown<T, U> = Pick<T, {[K in keyof T]: K extends U ? K : never}[keyof T]>;

// Add opaque markers for some values.
// Used for meta-logic in Zustand.

declare const markerSymbol: unique symbol;
export type IsMarked<T> = typeof markerSymbol extends keyof PickKnown<T, typeof markerSymbol> ? T : never;
export type Marked<T> = T extends IsMarked<T> ? T : {readonly [markerSymbol]: T};
export type Mark<T, M extends symbol> = Marked<T> & {readonly [K in M]: typeof markerSymbol};
export type HasMark<T, M extends symbol> = T extends IsMarked<T>
  ? T extends {[K in M]: typeof markerSymbol}
    ? T
    : never
  : never;
export type UnmarkAll<T> = T extends {[markerSymbol]: infer U} ? U : T;
export type UnmarkEmpty<T> = keyof T extends typeof markerSymbol ? UnmarkAll<T> : T;
export type Unmark<T, M extends symbol> = UnmarkEmpty<Omit<Marked<T>, M>>;
export type UnmarkObject<T, M extends symbol> = {[K in keyof T]: Unmark<T[K], M>};
export type UnmarkAllObject<T> = {[K in keyof T]: UnmarkAll<T[K]>};
