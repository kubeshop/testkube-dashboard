# Zustand stores

This directory contains Zustand stores, built with our wrapping utilities.

## Table of Contents

* [Structure](#structure)
* [Creating a slice](#creating-a-slice)
* [Creating a store](#creating-a-store)
  * [Store Factory](#store-factory)
  * [Store Builder](#store-builder)
  * [Attaching to existing store](#attaching-to-existing-store)
* [Connecting to React](#connecting-to-react)

## Structure

Each functionality should have its own [**slice**](https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md). A slice is an interface with defaults.
Such slice may be used either in standalone store, or attached to other one.

## Creating a slice

To create a slice you need to set up its interface, and create slice with `createSliceFactory` function:

```ts
import {StateCreator} from 'zustand';
import {createSliceFactory} from '@store/utils';

interface FooSlice {
  foo?: string;
  bar: number;
  incrementBar: () => void;
}

export const createFooSlice: StateCreator<FooSlice> = set => ({
  bar: 1,
  incrementBar: () => set(state => ({bar: state.bar + 1})),
});
```

## Creating a store

To create a standalone store, you may either use `createStoreBuilder` or `createStoreFactory`.

Either way, it will create a store factory - a function where you may pass initial state, and get a Zustand store instance.

### Store Factory

It's the simplest way to create a store. You need to pass store name for debugging purposes, and the slice to use:

```ts
import {StateCreator} from 'zustand';
import {createSliceFactory, createStoreFactory} from '@store/utils';

interface FooSlice {
  bar: string;
}

const createFooSlice: StateCreator<FooSlice> = set => ({
  bar: 'baz',
});

export const createFooStore = createStoreFactory('Foo', createFooSlice);
```

### Store Builder

It's useful for making a store from multiple slices. It will combine them together and automatically check for the conflicts. 

```ts
import {createStoreBuilder} from '@store/utils';
import {createFooSlice} from '@store/foo';
import {createBarSlice} from '@store/bar';

export const createBazStore = createStoreBuilder('Baz')
  .with(createFooSlice)
  .with(createBarSlice)
  .end();
```

### Attaching to existing store

To attach to existing store, use `createStoreBuilder` as in [**Store Builder** section](#store-builder) and simply add a new `.with()` clause for the store builder:

```diff
  import {connectStore, createStoreBuilder} from '@store/utils';
  import {createFooSlice} from '@store/foo';
+ import {createBarSlice} from '@store/bar';

  const createStore = createStoreBuilder('Baz')
    .with(createFooSlice)
+   .with(createBarSlice)
    .end();
```

## Connecting to React

To connect the store to React, you may use `connectStore` function, that will return multiple helpful React hooks.

```ts
import {StateCreator} from 'zustand';
import {connectStore, createSliceFactory, createStoreFactory} from '@store/utils';

interface FooSlice {
  bar: string;
  baz: number;
}

const createFooSlice: StateCreator<FooSlice> = set => ({
  bar: 'baz',
  baz: 999,
});

const createFooStore = createStoreFactory('Foo', createFooSlice);

export const {
  use: useFoo,
  useField: useFooField,
  pick: useFooPick,
  sync: useFooSync,
  init: initializeFoo,
} = connectStore(createFooStore);
```

To attach such store in some place of the application, initialize it as use it's Provider to pass context down. Then, the hooks from above could be used in child components.

```tsx
// Parent.ts
import {initializeFooStore} from '@store/foo';
import {Child} from './Child';

export const Parent: React.FC = () => {
  const [FooProvider, {
    use: useFoo,
    sync: useFooSync,
    pick: useFooPick,
    useField: useFooField,
  }] = initializeFoo(/* optional initial state */);
  
  // // If you don't want to manipulate the store in this component,
  // // you may just take the provider:
  // const [FooProvider] = initializeFoo(/* optional initial state */);
  // // or only the helpers you need:
  // const [FooProvider, {sync}] = initializeFoo(/* optional initial state */);

  return (
    <FooProvider>
      <Child/>
    </FooProvider>
  );
}

// Child.ts
import {useFoo, useFooField, useFooPick, useFooSetter, useFooSync} from '@store/foo';

export const Child: React.FC = () => {
  // Read single value from the state, or compute one
  const bar = useFoo(state => state.bar);
  
  // Read multiple values from the state
  const {bar, baz} = useFooPick('bar', 'baz');

  // Use React-state like format for values
  //
  // You don't need to memoize the setter, it's already handled.
  // When the function is called,
  // it will either call the corresponding setter in the store (like `setBar` or `setBaz`),
  // or if it doesn't exist - replace the property in place.
  const [bar, setBar] = useFooField('bar');

  // Synchronize value in the store with local one.
  // Don't forget to use useMemo, if you create an object here.
  // It will avoid rebuilding object identity.
  //
  // When the change is detected,
  // it will either call the existing setter (like `setBaz`),
  // or if it doesn't exist - replace the property in place (like `baz = bar.length`).
  useFooSync({
    baz: bar.length,
  });

  return (
    <input
      type="text"
      value={bar}
      onChange={event => setBar(event.target.value)}
    />
  );
};
```

In a second array item of the initialization results there are store hooks equivalents,
that allows reading and writing in the store locally.
