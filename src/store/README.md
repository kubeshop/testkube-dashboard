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
  * [Using global hooks](#using-global-hooks) 
* [State modifiers](#state-modifiers)
  * [Internal\<T>](#internalt)
  * [NonPublic\<T>](#nonpublict)
  * [NonPublicWrite\<T>](#nonpublicwritet)

## Structure

Each functionality should have its own [**slice**](https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md). A slice is an interface with defaults.
Such slice may be used either in standalone store, or attached to other one, i.e. [**global**](index.ts).

## Creating a slice

To create a slice you need to set up its interface, and create slice with `createSliceFactory` function:

```ts
import {createSliceFactory} from '@store/utils';

interface FooSlice {
  foo?: string;
  bar: number;
  incrementBar: () => void;
}

export const createFooSlice = createSliceFactory<FooSlice>(set => ({
  bar: 1,
  incrementBar: () => set(state => ({bar: state.bar + 1})),
}));
```

## Creating a store

To create a standalone store, you may either use `createStoreBuilder` or `createStoreFactory`.

Either way, it will create a store factory - a function where you may pass initial state, and get a Zustand store instance.

### Store Factory

It's the simplest way to create a store. You need to pass store name for debugging purposes, and the slice to use:

```ts
import {createSliceFactory, createStoreFactory} from '@store/utils';

interface FooSlice {
  bar: string;
}

const createFooSlice = createSliceFactory<FooSlice>(set => ({
  bar: 'baz',
}));

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
import {connectStore, createSliceFactory, createStoreFactory} from '@store/utils';

interface FooSlice {
  bar: string;
  baz: number;
}

const createFooSlice = createSliceFactory<FooSlice>(set => ({
  bar: 'baz',
  baz: 999,
}));

const createFooStore = createStoreFactory('Foo', createFooSlice);

export const {
  use: useFoo,
  useSetter: useFooSetter,
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
    use: usePrivateFoo,
    sync: usePrivateFooSync,
    pick: usePrivateFooPick,
    useSetter: usePrivateFooSetter,
    useField: usePrivateFooField,
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

  // Create a value setter.
  //
  // You don't need to memoize it, it's already handled.
  //
  // When the change is detected,
  // it will either call the corresponding setter in the store (like `setBar` or `setBaz`),
  // or if it doesn't exist - replace the property in place.
  const setBar = useFooSetter('bar');
  
  // Use React-state like format for values
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
that allows reading and writing into the non-public scope of the store. Read more in [**State Modifiers**](#state-modifiers) section.

### Using global hooks

Alternatively, you may use global stores. To do that, basically instantiate the store immediately.

```ts
import {connectStore, createSliceFactory, createStoreFactory} from '@store/utils';

interface FooSlice {
  bar: string;
  baz: number;
}

const createFooSlice = createSliceFactory<FooSlice>(set => ({
  bar: 'baz',
  baz: 999,
}));

const createFooStore = createStoreFactory('Foo', createFooSlice);

export const fooStore = createFooStore();
```

This approach is not recommended though, because the state is polluting the global,
instead of being in the context of the application.

You may use common hooks with such store too, using their global version:

```tsx
import {useStorePick, useStoreSetter, useStoreState, useStoreSync, useStoreField} from '@store/utils';
import {fooStore} from '@store/foo';

function Component() {
  // Read single value from the state, or compute one
  const bar = useStoreState(fooStore, state => state.bar);

  // Read multiple values from the state
  const {bar, baz} = useStorePick(fooStore, 'bar', 'baz');

  // Create a value setter; you don't need to memoize it, it's already handled.
  const setBar = useStoreSetter(fooStore, 'bar');

  // Create React-state-like access
  const [bar, setBar] = useStoreField(fooStore, 'bar');

  // Synchronize value in the store with local one.
  useStoreSync(fooStore, {
    baz: bar.length,
  });

  return (
    <input
      type="text"
      value={bar}
      onChange={event => setBar(event.target.value)}
    />
  );
}
```

Such store has no provider, so it may be used anywhere.

## State modifiers

By default, all the data from the slice are public, meaning that each hook will work with them.
There are some helpful types prepared though, that will allow to make the interface more clear.

### `Internal<T>`

When you need to use some value in the slice only for internal purposes, you may wrap it with `Internal` mapped type.

Typical use-case is having a setter, that should be not accessible,
yet callable by `useStoreSetter` and `useStoreSync`.

```ts
// @store/foo
import {Internal, createSliceFactory} from '@store/utils';

interface FooSlice {
  foo: string;
  setFoo: Internal<(value: string) => void>;
}

const createFooSlice = createSliceFactory<FooSlice>(set => ({
  foo: 'bar',
  setFoo: value => set({foo: `${value}-suffixed`}),
}));

// [...]

// Usage:
import {initializeFoo, useFoo, useFooField, useFooSetter, useFooSync} from '@store/foo';

const Parent: React.FC = () => {
  const [, {use, useField, useSetter, sync}] = initializeFoo();

  // ERROR: 'setFoo' is not recognized on 'state'
  const setFoo = use(state => state.setFoo);

  // SUCCESS: It will use `setFoo` internally anyway
  const [foo, setFoo] = useField('foo');

  // SUCCESS: It will use `setFoo` internally anyway
  const setFoo = useSetter('foo');

  // SUCCESS: It will use `setFoo` internally anyway
  sync({foo: 'some-value'});
};

const Child: React.FC = () => {
  // ERROR: 'setFoo' is not recognized on 'state'
  const setFoo = useFoo(state => state.setFoo);
  
  // SUCCESS: It will use `setFoo` internally anyway
  const [foo, setFoo] = useFooField('foo');
  
  // SUCCESS: It will use `setFoo` internally anyway
  const setFoo = useFooSetter('foo');
  
  // SUCCESS: It will use `setFoo` internally anyway
  useFooSync({foo: 'some-value'});
};
```

### `NonPublic<T>`

When you need to have some variables available/controlled in the parent component,
but you would not like to expose it to the children, you may use `NonPublic` type.

```ts
// @store/foo
import {NonPublic, createSliceFactory} from '@store/utils';

interface FooSlice {
  foo: NonPublic<string>;
  setFoo: (value: string) => void;
}

const createFooSlice = createSliceFactory<FooSlice>(set => ({
  foo: 'bar',
  setFoo: value => set({foo: `${value}-suffixed`}),
}));

// [...]

// Usage:
import {initializeFoo, useFoo, useFooField, useFooPick, useFooSetter, useFooSync} from '@store/foo';

const Parent: React.FC = () => {
  const [, {use, useSetter, useField, pick, sync}] = initializeFoo();

  // SUCCESS: 'foo' is available from non-public hooks
  const foo = use(state => state.foo);

  // SUCCESS: 'foo' is available from non-public hooks
  const {foo} = pick('foo');

  // SUCCESS: 'foo' is available from non-public hooks
  const [foo, setFoo] = useField('foo');

  // SUCCESS: 'foo' is available from non-public hooks
  const setFoo = useSetter('foo');

  // SUCCESS: 'foo' is available from non-public hooks
  sync({foo: 'some-value'});

  // SUCCESS: 'setFoo' is public
  const setFoo = use(state => state.setFoo);
};

const Child: React.FC = () => {
  // ERROR: 'foo' is not recognized on 'state'
  const foo = useFoo(state => state.foo);

  // ERROR: 'foo' is invalid argument for useFooPick
  const {foo} = useFooPick('foo');
  
  // ERROR: `foo` is invalid argument useFooField
  const [foo, setFoo] = useFooField('foo');
  
  // ERROR: `foo` is invalid argument useFooSetter
  const setFoo = useFooSetter('foo');
  
  // ERROR: `foo` is invalid property for useFooSync
  useFooSync({foo: 'some-value'});

  // SUCCESS: 'setFoo' is public
  const setFoo = useFoo(state => state.setFoo);
};
```

### `NonPublicWrite<T>`

When you need to have a property that should be accessible from children,
but should be modified only by the parent component, you may use `NonPublicWrite` type.


```ts
// @store/foo
import {NonPublic, createSliceFactory} from '@store/utils';

interface FooSlice {
  foo: NonPublicWrite<string>;
}

const createFooSlice = createSliceFactory<FooSlice>(set => ({
  foo: 'bar',
}));

// [...]

// Usage:
import {initializeFoo, useFoo, useFooField, useFooPick, useFooSetter, useFooSync} from '@store/foo';

const Parent: React.FC = () => {
  const [, {use, useSetter, useField, pick, sync}] = initializeFoo();

  // SUCCESS: 'foo' is publicly readable
  const foo = use(state => state.foo);

  // SUCCESS: 'foo' is publicly readable
  const {foo} = pick('foo');

  // SUCCESS: 'foo' is writable from non-public hooks
  const [foo, setFoo] = useField('foo');

  // SUCCESS: 'foo' is writable from non-public hooks
  const setFoo = useSetter('foo');

  // SUCCESS: 'foo' is writable from non-public hooks
  sync({foo: 'some-value'});
};

const Child: React.FC = () => {
  // SUCCESS: 'foo' is publicly readable
  const foo = useFoo(state => state.foo);

  // SUCCESS: 'foo' is publicly readable
  const {foo} = useFooPick('foo');
  
  // ERROR: `foo` is not writable from public hooks
  const [foo, setFoo] = useFooField('foo');
  
  // ERROR: `foo` is not writable from public hooks
  const setFoo = useFooSetter('foo');

  // ERROR: `foo` is not writable from public hooks
  useFooSync({foo: 'some-value'});
};
```
