# @testkube/plugins

## Table of contents

1. [Creating plugin](#creating-plugin)
   1. [Definition](#definition)
   2. [Dependencies](#dependencies)
   3. [Components](#components)
   4. [Routing](#routing)
   5. [Providers](#providers)
      1. [Zustand stores](#zustand-stores)
   6. [Unit testing](#unit-testing)
2. [Resolving plugins](#resolving-plugins)
   1. [Basic](#basic)
   2. [Nested systems](#nested-systems)

## Creating plugin

To create a new Testkube plugin, create a new package (you may copy some existing one), install `@testkube/plugins` and configure the plugin.
Remember, to have `antd`/`react`/`react-dom` installed as dev/peer dependencies only and in the same version as Dashboard, to avoid duplicating it.

### Definition

The plugin definition is fully type-safe. The plugin may define different parts of itself, as follows:

```tsx
import {StoreProvider, createPlugin, data, external, slot, config} from '@testkube/plugins';

// Remember to use `import type`, as you won't need to include the external plugin in code
import type SomePlugin from '@testkube/some-plugin';

// Remember to use `import type`, as you won't need to include the external plugin in code
import type SomeCloudPlugin from '@testkube-cloud/some-cloud-plugin';

// Load types from external plugin
const somePluginStub = external<typeof SomePlugin>();

// Load types from external plugin
const someOuterStub = external<typeof SomeCloudPlugin>();

export default createPlugin('some-plugin-name')
    // Set plugin's priority to order with other plugins.
    // By default it's 0, and the plugins are ordered from -Infinity to Infinity.
    .order(-100)
  
    // Define local configuration
    .define(config<string>()('requiredKey'))
    .define(config<string>()('optionalKey', 'defaultValue'))

    // Declare initial data for the plugin
    .data({someVariable: 'abc', someFn: () => 5})
    
    // Declare other variables that will be exposed by this plugin
    .define(data<string>()('otherVariable'))
    .define(data<(value: string) => number>()('otherFn'))
    
    // Declare the slot that other plugins may inject to
    .define(slot<string>('warnings'))
    
    // Declare usage of public data from some other plugins
    .needs(somePluginStub.data('some1Variable', 'some1Fn'))
    
    // Declare injecting to slot of a different plugin
    .needs(somePluginStub.slot('someSlot', 'someOtherSlot'))
    
    // Declare dependency from the plugin,
    // that is in another plugins system above.
    // Most likely, you will use it only while creating Dashboard plugin,
    // that will interact with internal Cloud data.
    // Alternatively, it may be used to get data from optional plugins.
    .outer(someOuterStub.data('organizationId'))
    
    // Inject provider that will wrap all the components inside
    .provider(<SomeReactProvider value={10} />)

    // Inject provider with forcing different order.
    // By default all providers have such order: 0.
    // It's worth to use it, when the provider creates a context,
    // and such context doesn't have any dependencies.
    // Thanks to that, context is widely accessible.
    .provider(<SomeReactContext.Provider value={{}} />, {order: -50})

    // Inject provider that will wrap all the components inside.
    // Append only if `someVariable` is set to 'xyz'.
    .provider(<SomeConditionalReactProvider value={10} />, {
        enabled: tk => tk.data.someVariable === 'xyz',
    })
    
    // Inject a new page to the system
    .route('/tests', <TestsPage />)

    // Configure the plugin
    .init((tk, cfg) => {
        // Read the local plugin configuration
        console.log(cfg.baseUrl);
      
        // Change current value of the `someVariable`
        tk.data.someVariable = 'xyz';
        
        // Read own data
        console.log(tk.data.someFn());
        
        // Read data from external plugin
        console.log(tk.data.some1Variable);
        console.log(tk.data.some1Fn());
        
        // Read data from external plugin in outer system.
        console.log(tk.data.organizationId);
        
        // Read all available values from the current slot.
        console.log(tk.slots.warnings.all());
        
        // Read the first value from the current slot.
        console.log(tk.slots.warnings.first());

        // Inject to declared SomePlugin dependency slot.
        // It may be ordered similarly to plugin. As an example, `Infinity` should keep it as last item.
        tk.slots.somePluginStub.someSlot.add('some slot value', {order: Infinity});

        // Inject to declared SomePlugin dependency slot.
        // The slot item may be conditional.
        tk.slots.somePluginStub.someOtherSlot.add(1234, {enabled: () => tk.data.someVariable === 'xyz'});
       
        // When you need to call the React hooks in this place,
        // You may use .sync() helper.
        // It's not fast option, but it's very convenient.
        const isLoading = tk.sync(() => useSomeStoreData('loading'));
        tk.slots.somePluginStub.someOtherSlot.add(<>Loading...</>, {enabled: isLoading});
    });
```

Additionally, there is a helper to create a simple plugin that exposes some data for usage:

```ts
import {createDataPlugin} from '@testkube/plugins';

export interface SomeConfigurationData {
    baseUrl: string;
    otherConfiguration: string;
    anotherConfiguration: string;
}

export default createDataPlugin('some-configuration')({
  baseUrl: undefined,
  otherConfiguration: 'defaultValue',
  anotherConfiguration: 'anotherDefaultValue',
});
```

Such plugin may be instantiated similarly to other plugins:

```ts
import DataPlugin from 'some/path/there';

// [...]
PluginResolver.of(
    DataPlugin.configure({
      baseUrl: 'requiredBaseUrl',
      anotherConfiguration: 'overrideAnotherConfigurationDefaults',
    })
)
```

### Dependencies

There are two methods in the plugin definition to declare dependency:

* `.needs(/* dependency */)` - required dependency in the same system
* `.outer(/* dependency */)` - optional dependency, that may be included even from higher scope (Cloud -> OSS)

These methods take a parameter, that declares what are the dependencies used by the plugin.

To use values/slots from different plugin, you may use `external` utility:

```ts
import {createPlugin, external} from '@testkube/plugins';

// Remember to use `type` - otherwise @testkube/some-other-plugin may be unnecessarily bundled twice
import type SomeOtherPlugin from '@testkube/some-other-plugin';

// Create a type-safe layer describing SomeOtherPlugin
const someOtherPluginStub = external<typeof SomeOtherPlugin>();

export default createPlugin('some-plugin')
   // Use 'slot1' and 'slot2' slots from SomeOtherPlugin
   .needs(someOtherPluginStub.slots('slot1', 'slot2'))

   // Use 'value1' and 'value2' data from SomeOtherPlugin
   .needs(someOtherPluginStub.slots('value1', 'value2'))
        
   /* ... */

   .init();
```

To use generic values, you may use same helpers as for declaration.
It's not preferred though, as it won't reflect changes in the external module:

```ts
import {createPlugin, data, slot} from '@testkube/plugins';

export default createPlugin('some-plugin')
   // Use 'slot1' and 'slot2' slots from other plugin
   .needs(slot<{index: number, key: string, value: string}>()('slot1'))
   .needs(slot<string>()('slot2'))

   // Use 'value1' and 'value2' data from other plugin
   .needs(data<{index: number, key: string, value: string}>()('value1'))
   .needs(data<string>()('value2'))
        
   /* ... */

   .init();
```

### Components

To use the data and slots from the plugin inside the component,
you may use the provided hooks (or actually, hook creators).

The suggested way would be to create the hooks file in the plugin package,
that will have all typed hooks created.

```tsx
// Tree structure:
// .
// └── src
//     ├── components
//     │   └── SomeComponent.tsx
//     ├── hooks.ts
//     └── plugin.tsx

// src/hooks.ts
import {createUseData, createUseSlot, createUseSlotFirst} from '@testkube/plugins';
import type TheCurrentPlugin from './plugin';

export const useData = createUseData<typeof TheCurrentPlugin>();
export const useSlot = createUseSlot<typeof TheCurrentPlugin>();
export const useSlotFirst = createUseSlotFirst<typeof TheCurrentPlugin>();

// src/components/SomeComponent.tsx
import {FC} from 'react';
import {useData, useSlot, useSlotFirst} from '../hooks';

export const SomeComponent: FC = () => {
   // Reading slots
   const slot1Data = useSlot('slot1');
   const slotFirst = useSlotFirst('slot1'); // faster equivalent of: useSlot('slot1')[0]
   
   // Reading data
   const {value1} = useData(); // easiest, but slowest - it will re-render every time the scope data are changed in any way
   const {value2} = useData.pick('value2', 'value3'); // pick selected keys - it will re-render only when one of them changes
   const value3 = useData.select(x => x.value3); // select some value - it will re-render when result identity is changed
   const {value4, value5} = useData.shallow(x => ({value4: x.value4, value5: x.value5})); // same as .select(), but it will only re-render when result values 

   return slot1Data.map(x => <div key={x.id}>{x.name} {value1 === x.id ? ' (current)' : null}</div>);
};
```

### Routing

To add new route, simply append the routing with component that should be rendered.

```tsx
import {createPlugin} from '@testkube/plugins';
import TestsList from './components/TestsList';
import TestDetails from './components/TestDetails';

export default createPlugin('some-plugin')
  .route('/tests', <TestsList />)
  .route('/tests/:id', <TestDetails />)
        
  .init();
```

> **The mechanism for choosing route is not included in the package, it may be specific to project.**

### Providers

When you're dealing with React, you often need to provide data via context through wrapping components.
Such component basically renders the children, often with wrapping the components with the React Provider only.

To add such provider, you may use `.provider()` method:

```tsx
import {createContext} from 'react';
import {createPlugin} from '@testkube/plugins';

const SomeContext = createContext();

export default createPlugin('some-name')
    // Append the provider, that is just simple React Context provider
    .provider({type: SomeContext.Provider, props: {value: {foo: 'bar'}}})

    // You may use alternative JSX syntax too, the children will be added automatically anyway.
    .provider(<SomeContext.Provider value={{foo: 'bar'}} />)
        
    // Additionally

    .init();
```

#### Zustand stores

As we are commonly using Zustand as the data store,
there is a helpful provider to automatically inject it.

It allows passing dependencies and initial state too, so it's able to even recreate the store after changes.

```tsx
import {createPlugin, StoreProvider} from '@testkube/plugins';

import {initializeSomeStore, useSomeStorePick} from './store';

export default createPlugin('some-name')
    // Inject the store
    .provider(<StoreProvider store={initializeSomeStore} />)

    // Such store may be reset by some data too
    .needs(data<string>()('environmentId'))
    .provider(tk => <StoreProvider store={initializeSomeStore} dependencies={[tk.data.environmentId]} />)

    // Expose public interface for other plugins
    .data({useSomeStorePick})

    .init();
```

### Unit testing

> **TODO:** There will be prepared nice utilities to help testing the plugins.

## Resolving plugins

The plugin resolution is confirming the plugins integrity (proper order, all dependencies available, etc),
and returns scope factory and information required to build the application upon.

### Basic

```tsx
import {FC, useMemo} from 'react';
import {PluginResolver} from '@testkube/plugins';

import SomePlugin1 from '@testkube/some-plugin-1';
import SomePlugin2 from '@testkube/some-plugin-2';

// - `routes` contains an ordered list of routes that are available
// - `initialize` builds the scope, that contains all the slots & data
// - `Provider` is a context provider for the root scope
const [Provider, {initialize, routes}] = new PluginResolver()
    .register(SomePlugin1)
    .register(SomePlugin2, {configKey: 'configValue'})
    .resolve();

// // Alternatively, you may use `PluginResolver.of`:
// const [Provider, {initialize, routes}] = PluginResolver.of(
//   SomePlugin1,
//   SomePlugin2.configure({configKey: 'configValue'})
// ).resolve();

export const App: FC = () => {
    const scope = useMemo(() => initialize(), []);
    return (
        <Provider root={scope}>
            {/* Most likely react-router or other routing solution should build upon the data. */}
            {routes[0].element}
        </Provider>
    );
}
```

### Nested systems

When you want to have nested systems, it is possible to build them, and even access from the lower system to the upper.
It may be helpful, when i.e. Cloud solution is using OSS solution, and some of the OSS plugins needs to access the Cloud scope (like organizations list), with `.outer()` (as described [above](#dependencies)).

```tsx
import {FC, useMemo} from 'react';
import {PluginResolver} from '@testkube/plugins';

import SomeCloudPlugin1 from '@testkube/some-cloud-plugin-1';
import SomeCloudPlugin2 from '@testkube/some-cloud-plugin-2';
import SomePlugin1 from '@testkube/some-plugin-1';
import SomePlugin2 from '@testkube/some-plugin-2';

const [CloudProvider, {initialize: initializeCloud, routes: cloudRoutes}] = new PluginResolver()
    .register(SomeCloudPlugin1)
    .register(SomeCloudPlugin2)
    .resolve();

const [LowerProvider, {initialize: initializeLower, routes: lowerRoutes}] = new PluginResolver()
    .register(SomePlugin1)
    .register(SomePlugin2)
    .resolve();

export const App: FC = () => {
    const cloudScope = useMemo(() => initializeCloud(), []);
    const lowerScope = useMemo(() => initializeLower(cloudScope), [cloudScope]);
    const combinedRoutes = useMemo(() => [...cloudRoutes, ...lowerRoutes.map(x => ({...x, path: `/dashboard/${x}`}))], []);
    return (
        <CloudProvider root={cloudScope}>
            <LowerProvider root={lowerScope}>
                {/* Most likely react-router or other routing solution should build upon the data. */}
                {combinedRoutes[0].element}
            </LowerProvider>
        </CloudProvider>
    );
}
```
