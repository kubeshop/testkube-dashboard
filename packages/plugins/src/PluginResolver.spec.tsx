import {FC, PropsWithChildren, ReactElement, createContext, useContext} from 'react';
import {useInterval} from 'react-use';

import {act, render, renderHook} from '@testing-library/react';
import {StateCreator} from 'zustand';

import {connectStore, createStoreFactory} from '@testkube/web/src/store/utils';

import {PluginResolver} from './PluginResolver';
import {StoreProvider} from './StoreProvider';
import {createPlugin} from './createPlugin';
import {createUseSlot} from './hooks';
import {Plugin} from './internal/Plugin';
import {PluginBuilder} from './internal/PluginBuilder';
import {PluginScope} from './internal/PluginScope';
import {PluginScopeContext} from './internal/PluginScopeProvider';
import {PluginProvider, PluginState} from './internal/types';
import {config, data, external, slot} from './utils';

const mockProvider = (testId: string): PluginProvider<{}> => ({
  type: (({children}) => <div data-testid={testId}>{children}</div>) as FC<PropsWithChildren<{}>>,
  props: {},
});

const r = (name: string) => <div data-testid={`route-${name}`} />;

const create = (plugins: Plugin<any>[]) =>
  plugins.reduce((resolver, plugin) => resolver.register(plugin), new PluginResolver<PluginState>());
const p = (
  name: string,
  order: number = 0,
  enhance: (p: PluginBuilder<any>) => PluginBuilder<any> = x => x,
  initialize: (p: PluginScope<any>) => void = () => {}
) =>
  enhance(
    createPlugin(name)
      .order(order)
      .route(`/test/${name}`, r(name))
      .provider(mockProvider(`p-${name}`))
  )
    .define(slot()(`s-${name}`))
    .define(data()(`d-${name}`))
    .data({[`v-${name}`]: true})
    .init(tk => {
      tk.data[`d-${name}`] = true;
      initialize(tk);
    });

const domOrderFor = (prefix: string, element: HTMLElement): string[] => {
  const arr: string[] = [];
  let container: HTMLElement | null = element;
  while (container) {
    container = container.querySelector(prefix ? `[data-testid^=${prefix}]` : '[data-testid]');
    if (container) {
      arr.push(container.getAttribute('data-testid')!.substring(prefix.length));
    }
  }
  return arr;
};

interface FooSlice {
  count: number;
  increment: () => void;
}
const createFooSlice: StateCreator<FooSlice> = set => ({
  count: 0,
  increment: () => set(({count}) => ({count: count + 1})),
});
const createFooStore = createStoreFactory('Foo', createFooSlice);
const foo = connectStore(createFooStore);

describe('plugins', () => {
  describe('PluginResolver', () => {
    it('should register all data', () => {
      jest.spyOn(console, 'warn').mockImplementation().mockClear();

      const plugins = [p('name3', 500), p('name2'), p('name1', -300)];
      const resolver = create(plugins);
      const [, {initialize}] = resolver.resolve();
      const scope = initialize();

      expect(scope.data).toEqual({
        'd-name1': true,
        'v-name1': true,
        'd-name2': true,
        'v-name2': true,
        'd-name3': true,
        'v-name3': true,
      });
    });

    it('should correctly order registered plugins (without dependencies)', () => {
      jest.spyOn(console, 'warn').mockImplementation().mockClear();

      const plugins = [p('name3', 500), p('name2'), p('name1', -300), p('name0', -Infinity), p('name4', Infinity)];
      const resolver = create(plugins);
      const [Provider, {routes, initialize}] = resolver.resolve();
      const scope = initialize();
      const result = render(
        <Provider root={scope}>
          <div data-testid="inner" />
        </Provider>
      );

      expect(routes).toEqual([
        {path: '/test/name0', element: r('name0'), metadata: {}},
        {path: '/test/name1', element: r('name1'), metadata: {}},
        {path: '/test/name2', element: r('name2'), metadata: {}},
        {path: '/test/name3', element: r('name3'), metadata: {}},
        {path: '/test/name4', element: r('name4'), metadata: {}},
      ]);
      expect(domOrderFor('p-', result.container)).toEqual(['name0', 'name1', 'name2', 'name3', 'name4']);
    });

    it('should correctly order registered plugins (based on dependencies)', () => {
      jest.spyOn(console, 'warn').mockImplementation().mockClear();

      const plugins = [
        p('name3', 500),
        p('name2', 0, $ => $.define(data()('value'))),
        p('name1', -300, $ => $.needs(slot()('slot'))),
        p('name0', -Infinity, $ => $.needs(data()('value'))),
        p('name4', Infinity, $ => $.define(slot()('slot'))),
      ];
      const resolver = create(plugins);
      const [Provider, {routes, initialize}] = resolver.resolve();
      const scope = initialize();
      const result = render(
        <Provider root={scope}>
          <div data-testid="inner" />
        </Provider>
      );

      expect(routes).toEqual([
        {path: '/test/name2', element: r('name2'), metadata: {}},
        {path: '/test/name0', element: r('name0'), metadata: {}},
        {path: '/test/name3', element: r('name3'), metadata: {}},
        {path: '/test/name4', element: r('name4'), metadata: {}},
        {path: '/test/name1', element: r('name1'), metadata: {}},
      ]);
      expect(domOrderFor('p-', result.container)).toEqual(['name2', 'name0', 'name3', 'name4', 'name1']);
    });

    it('should correctly order registered plugins (based on dependencies, ignoring optional)', () => {
      jest.spyOn(console, 'warn').mockImplementation().mockClear();

      const plugins = [
        p('name3', 500),
        p('name2', 0, $ => $.define(data()('value'))),
        p('name1', -300, $ => $.needs(slot()('slot'))),
        p('name0', -Infinity, $ => $.outer(data()('value'))),
        p('name4', Infinity, $ => $.define(slot()('slot'))),
      ];
      const resolver = create(plugins);
      const [Provider, {routes, initialize}] = resolver.resolve();
      const scope = initialize();
      const result = render(
        <Provider root={scope}>
          <div data-testid="inner" />
        </Provider>
      );

      expect(routes).toEqual([
        {path: '/test/name0', element: r('name0'), metadata: {}},
        {path: '/test/name2', element: r('name2'), metadata: {}},
        {path: '/test/name3', element: r('name3'), metadata: {}},
        {path: '/test/name4', element: r('name4'), metadata: {}},
        {path: '/test/name1', element: r('name1'), metadata: {}},
      ]);
      expect(domOrderFor('p-', result.container)).toEqual(['name0', 'name2', 'name3', 'name4', 'name1']);
    });

    it('should try to order plugins with circular dependencies anyway', () => {
      jest.spyOn(console, 'warn').mockImplementation().mockClear();

      const plugins = [
        p('name3', 500),
        p('name2', 0, $ => $.define(data()('value2')).needs(data()('value0'))),
        p('name1', -300, $ => $.needs(slot()('slot'))),
        p('name0', -Infinity, $ => $.define(data()('value0')).needs(data()('value2'))),
        p('name4', Infinity, $ => $.define(slot()('slot'))),
      ];
      const resolver = create(plugins);
      const [Provider, {routes, initialize}] = resolver.resolve();
      const scope = initialize();
      const result = render(
        <Provider root={scope}>
          <div data-testid="inner" />
        </Provider>
      );

      // Steps:
      // - check fulfilled modules - choosing 3
      // - check fulfilled modules - choosing 4
      // - check fulfilled modules - nothing
      //   - check modules that have fulfilled data dependency - 3
      // - check fulfilled modules - nothing
      //   - check modules that have fulfilled data dependency - nothing
      //     - circular dependency, for handling it gracefully take the first one - choosing 0
      // - check fulfilled modules - choosing 2
      expect(routes).toEqual([
        {path: '/test/name3', element: r('name3'), metadata: {}},
        {path: '/test/name4', element: r('name4'), metadata: {}},
        {path: '/test/name1', element: r('name1'), metadata: {}},
        {path: '/test/name0', element: r('name0'), metadata: {}},
        {path: '/test/name2', element: r('name2'), metadata: {}},
      ]);
      expect(domOrderFor('p-', result.container)).toEqual(['name3', 'name4', 'name1', 'name0', 'name2']);
    });

    it('should detect missing slot', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation().mockClear();

      const plugins = [
        p('name0', 500, $ => $.define(slot()('slot1', 'slot2'))),
        p('name1', 0, $ => $.needs(slot()('slot1', 'slot3'))),
        p('name2', 0, $ => $.needs(slot()('slot4'))),
      ];
      const resolver = create(plugins);
      const [, {initialize}] = resolver.resolve();
      initialize();

      expect(warnSpy).toHaveBeenCalledWith(
        'Detected problems with plugins:\nname1: required "slot3" slot is not registered.\nname2: required "slot4" slot is not registered.'
      );
    });

    it('should detect missing data', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation().mockClear();

      const plugins = [
        p('name0', 500, $ => $.define(data()('value1', 'value2'))),
        p('name1', 0, $ => $.needs(data()('value1', 'value3'))),
        p('name2', 0, $ => $.needs(data()('value4'))),
      ];
      const resolver = create(plugins);
      const [, {initialize}] = resolver.resolve();
      initialize();

      expect(warnSpy).toHaveBeenCalledWith(
        'Detected problems with plugins:\nname1: required "value3" data is not registered.\nname2: required "value4" data is not registered.'
      );
    });

    it('should not detect missing data or slots for optional modules', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation().mockClear();

      const plugins = [
        p('name0', 500, $ => $.outer(data()('value1', 'value2'))),
        p('name1', 0, $ => $.outer(slot()('slot1', 'slot3'))),
      ];
      const resolver = create(plugins);
      const [, {initialize}] = resolver.resolve();
      initialize();

      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should not detect missing data or slots when these are declared above modules', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation().mockClear();

      const rootPlugins = [
        p('name0', 500, $ => $.define(data()('value1', 'value2'))),
        p('name1', 0, $ => $.define(slot()('slot1', 'slot2'))),
      ];
      const [, {initialize: initializeRoot}] = create(rootPlugins).resolve();
      const root = initializeRoot();

      const plugins = [
        p('name2', 500, $ => $.needs(data()('value1', 'value2'))),
        p('name3', 0, $ => $.needs(slot()('slot1', 'slot2'))),
      ];
      const resolver = create(plugins);
      const [, {initialize}] = resolver.resolve();
      initialize(root);

      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should detect missing data or slots when part is not declared in above modules', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation().mockClear();

      const rootPlugins = [
        p('name0', 500, $ => $.define(data()('value1'))),
        p('name1', 0, $ => $.define(slot()('slot1'))),
      ];
      const [, {initialize: initializeRoot}] = create(rootPlugins).resolve();
      const root = initializeRoot();

      const plugins = [
        p('name2', 500, $ => $.needs(data()('value1', 'value2'))),
        p('name3', 0, $ => $.needs(slot()('slot1', 'slot2'))),
      ];
      const resolver = create(plugins);
      const [, {initialize}] = resolver.resolve();
      initialize(root);

      expect(warnSpy).toHaveBeenCalledWith(
        'Detected problems with plugins:\nname2: required "value2" data is not registered.\nname3: required "slot2" slot is not registered.'
      );
    });

    it('should detect circular dependencies', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation().mockClear();

      const plugins = [
        p('name0', 500, $ => $.define(data()('value1')).needs(data()('value2'))),
        p('name1', 0, $ => $.define(data()('value2')).needs(data()('value1'))),
      ];
      const resolver = create(plugins);
      const [, {initialize}] = resolver.resolve();
      initialize();

      expect(warnSpy).toHaveBeenCalledWith(
        'Detected problems with plugins:\ncircular dependency: name1 ➟ name0\ncircular dependency: name0 ➟ name1'
      );
    });

    it('should expose root context', () => {
      const plugins = [p('name2', 0, $ => $.data({key1: 'value1'})), p('name2', 0, $ => $.data({key2: 'value2'}))];
      const resolver = create(plugins);
      const [Provider, {routes, initialize}] = resolver.resolve();
      const scope = initialize();
      const {result} = renderHook(() => useContext(PluginScopeContext), {
        wrapper: ({children}) => <Provider root={scope}>{children}</Provider>,
      });
      expect(result.current.root).toBe(scope);
    });

    it('should be able to synchronize React hook value across modules', () => {
      jest.spyOn(console, 'warn').mockImplementation().mockClear();
      jest.useFakeTimers();

      const CountIncrement: FC<{children?: ReactElement}> = ({children = null}) => {
        const {increment} = foo.pick('increment');
        useInterval(increment, 500);
        return children;
      };

      const plugin1 = createPlugin('plugin1')
        .data({use: foo.use})
        .define(slot<string>()('warnings'))
        .provider(<StoreProvider store={foo.init} />)
        .provider(<CountIncrement />)
        .init();
      const stub = external<typeof plugin1>();
      const plugin2 = createPlugin('plugin2')
        .needs(stub.slots('warnings'))
        .needs(stub.data('use'))
        .init(tk => {
          const getCount = tk.sync(() => tk.data.use(x => x.count), 0);
          tk.slots.warnings.add('count should be odd!', {
            enabled: () => getCount() % 2 === 0,
          });
        });

      const resolver = create([plugin1, plugin2]);
      const [Provider, {initialize}] = resolver.resolve();
      const scope = initialize();

      render(<Provider root={scope}>text</Provider>);
      const initial = scope.slots.warnings.all();

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(initial).toEqual(['count should be odd!']);
      expect(scope.slots.warnings.all()).toEqual([]);
    });

    it('should reflect injecting into slot', async () => {
      const useSlot = createUseSlot<typeof plugin1>();

      const List: FC = () => {
        const items = useSlot('items');
        return (
          <ul>
            {items.map(x => (
              <li data-testid="included-item" key={x.id}>
                {x.name}
              </li>
            ))}
          </ul>
        );
      };

      const plugin1 = createPlugin('name1', 'version1')
        .route('/abc', <List />)
        .define(slot<{id: string; name: string}>()('items'))
        .init();
      const stub = external<typeof plugin1>();
      const plugin2 = createPlugin('name2', 'version2')
        .needs(stub.slots('items'))
        .init(tk => {
          tk.slots.items.add({id: 'test-id', name: 'test-name'});
          tk.slots.items.add({id: 'test-id-2', name: 'test-name-2'});
        });

      const resolver = create([plugin1, plugin2]);
      const [Provider, {routes, initialize}] = resolver.resolve();
      const scope = initialize();

      const route = routes.find(x => x.path === '/abc');

      const result = render(<Provider root={scope}>{route?.element}</Provider>);
      const renderedItems = await result.findAllByTestId('included-item');

      expect(renderedItems.length).toBe(2);
      expect(renderedItems.map(x => x.textContent)).toEqual(['test-name', 'test-name-2']);
    });

    it('should sync on the level of the child scope that has requested sync', () => {
      const XyzContext = createContext<number>(0);

      const base = createPlugin('base').define(slot<string>()('slot')).init();
      const stub = external<typeof base>();
      const plugin1 = createPlugin('plugin1')
        .provider(<XyzContext.Provider value={1} />)
        .needs(stub.slots('slot'))
        .init(tk => {
          const getContext = tk.sync(() => useContext(XyzContext));
          tk.slots.slot.add('one', {enabled: () => getContext() === 1});
          tk.slots.slot.add('two', {enabled: () => getContext() === 2});
        });
      const plugin2 = createPlugin('plugin1')
        .provider(<XyzContext.Provider value={2} />)
        .needs(stub.slots('slot'))
        .init(tk => {
          const getContext = tk.sync(() => useContext(XyzContext));
          tk.slots.slot.add('one', {enabled: () => getContext() === 1});
          tk.slots.slot.add('two', {enabled: () => getContext() === 2});
        });

      const resolver = create([base, plugin1, plugin2]);
      const [Provider, {initialize}] = resolver.resolve();
      const scope = initialize();

      render(<Provider root={scope} />);

      expect(scope.slots.slot.all()).toEqual(['one', 'two']);
    });

    it('should support nested root scopes', () => {
      // Prepare root scope
      const rootPlugin = createPlugin('root')
        .data({rootKey: 'rootValue', key1: 'value1'})
        .define(slot<string>()('rootSlot'))
        .define(slot<string>()('slot1'))
        .init(tk => {
          tk.slots.rootSlot.add('rootRootSlotItem1');
          tk.slots.slot1.add('rootSlot1Item1');
        });
      const [RootProvider, {initialize: initializeRoot}] = new PluginResolver().register(rootPlugin).resolve();
      const rootScope = initializeRoot();
      const rootStub = external<typeof rootPlugin>();

      // Prepare lower scope
      const lowerPlugin = createPlugin('lower')
        .outer(rootStub.data('rootKey'))
        .outer(rootStub.slots('rootSlot'))
        .data({key1: 'value2'})
        .define(slot<string>()('slot1'))
        .init(tk => {
          tk.slots.rootSlot!.add('lowerRootSlotItem1');
          tk.slots.slot1.add('lowerSlot1Item1');
        });
      const [LowerProvider, {initialize: initializeLower}] = new PluginResolver().register(lowerPlugin).resolve();
      const lowerScope = initializeLower(rootScope);

      expect(lowerScope.slots.rootSlot?.all()).toEqual(['rootRootSlotItem1', 'lowerRootSlotItem1']);
      expect(rootScope.slots.rootSlot?.all()).toEqual(['rootRootSlotItem1', 'lowerRootSlotItem1']);
      expect(lowerScope.slots.slot1?.all()).toEqual(['lowerSlot1Item1']);
      expect(rootScope.slots.slot1?.all()).toEqual(['rootSlot1Item1']);
      expect(lowerScope.data.rootKey).toEqual('rootValue');
      expect(rootScope.data.rootKey).toEqual('rootValue');
      expect(lowerScope.data.key1).toEqual('value2');
      expect(rootScope.data.key1).toEqual('value1');
    });
  });

  it('should be able to clear items of the lower scope in the root scope', () => {
    // Prepare root scope
    const rootPlugin = createPlugin('root')
      .data({rootKey: 'rootValue', key1: 'value1'})
      .define(slot<string>()('rootSlot'))
      .define(slot<string>()('slot1'))
      .init(tk => {
        tk.slots.rootSlot.add('rootRootSlotItem1');
        tk.slots.slot1.add('rootSlot1Item1');
      });
    const [RootProvider, {initialize: initializeRoot}] = new PluginResolver().register(rootPlugin).resolve();
    const rootScope = initializeRoot();
    const rootStub = external<typeof rootPlugin>();

    // Prepare lower scope
    const lowerPlugin = createPlugin('lower')
      .outer(rootStub.data('rootKey'))
      .outer(rootStub.slots('rootSlot'))
      .data({key1: 'value2'})
      .define(slot<string>()('slot1'))
      .init(tk => {
        tk.slots.rootSlot!.add('lowerRootSlotItem1');
        tk.slots.slot1.add('lowerSlot1Item1');
      });
    const [LowerProvider, {initialize: initializeLower}] = new PluginResolver().register(lowerPlugin).resolve();
    const lowerScope = initializeLower(rootScope);

    lowerScope.slots.rootSlot?.add('dynamicItemForDeletion');
    rootScope.slots.rootSlot.add('dynamicItemToPreserve');

    lowerScope.destroy();

    expect(rootScope.slots.rootSlot?.all()).toEqual(['rootRootSlotItem1', 'dynamicItemToPreserve']);
    expect(lowerScope.slots.rootSlot?.all()).toEqual(['rootRootSlotItem1', 'dynamicItemToPreserve']);
    expect(rootScope.slots.slot1?.all()).toEqual(['rootSlot1Item1']);
    expect(lowerScope.slots.slot1.all()).toEqual([]);
  });

  it('should destroy the lower scope when outer is getting destroyed', () => {
    // Prepare root scope
    const rootPlugin = createPlugin('root')
      .data({rootKey: 'rootValue', key1: 'value1'})
      .define(slot<string>()('rootSlot'))
      .define(slot<string>()('slot1'))
      .init(tk => {
        tk.slots.rootSlot.add('rootRootSlotItem1');
        tk.slots.slot1.add('rootSlot1Item1');
      });
    const [RootProvider, {initialize: initializeRoot}] = new PluginResolver().register(rootPlugin).resolve();
    const rootScope = initializeRoot();
    const rootStub = external<typeof rootPlugin>();

    // Prepare lower scope
    const lowerPlugin = createPlugin('lower')
      .outer(rootStub.data('rootKey'))
      .outer(rootStub.slots('rootSlot'))
      .data({key1: 'value2'})
      .define(slot<string>()('slot1'))
      .init(tk => {
        tk.slots.rootSlot!.add('lowerRootSlotItem1');
        tk.slots.slot1.add('lowerSlot1Item1');
      });
    const [LowerProvider, {initialize: initializeLower}] = new PluginResolver().register(lowerPlugin).resolve();
    const lowerScope = initializeLower(rootScope);

    lowerScope.slots.rootSlot?.add('dynamicLowerItemForDeletion');
    rootScope.slots.rootSlot.add('dynamicRootItemToDeletion');

    rootScope.destroy();

    expect(rootScope.slots.rootSlot?.all()).toEqual([]);
    expect(lowerScope.slots.rootSlot?.all()).toEqual([]);
    expect(rootScope.slots.slot1?.all()).toEqual([]);
    expect(lowerScope.slots.slot1.all()).toEqual([]);
  });

  it('should allow specifying conditional providers', () => {
    const plugin = createPlugin('plugin')
      .define(data()('value'))
      .provider(mockProvider('p-enabled'), {enabled: () => true})
      .provider(mockProvider('p-disabled'), {enabled: () => false})
      .provider(mockProvider('p-dynamic'), {
        enabled: tk => tk.data.value === 1,
      })
      .init();
    const [Provider, {initialize}] = new PluginResolver().register(plugin).resolve();
    const scope = initialize();
    const result = render(<Provider root={scope} />);

    expect(result.queryByTestId('p-enabled')).toBeTruthy();
    expect(result.queryByTestId('p-disabled')).toBeFalsy();
    expect(result.queryByTestId('p-dynamic')).toBeFalsy();

    scope.data.value = 1;
    result.rerender(<Provider root={scope} />);

    expect(result.queryByTestId('p-enabled')).toBeTruthy();
    expect(result.queryByTestId('p-disabled')).toBeFalsy();
    expect(result.queryByTestId('p-dynamic')).toBeTruthy();
  });

  it('should put conditional providers after the static', () => {
    const plugin1 = createPlugin('plugin1')
      .provider(mockProvider('p-dynamic1'), {enabled: () => true})
      .provider(mockProvider('p-static1'))
      .provider(mockProvider('p-dynamic2'), {enabled: () => true})
      .provider(mockProvider('p-static2'))
      .init();
    const plugin2 = createPlugin('plugin2')
      .provider(mockProvider('p-static3'))
      .provider(mockProvider('p-dynamic3'), {enabled: () => true})
      .provider(mockProvider('p-static4'))
      .provider(mockProvider('p-dynamic4'), {enabled: () => true})
      .init();
    const [Provider, {initialize}] = new PluginResolver().register(plugin1).register(plugin2).resolve();
    const scope = initialize();
    const result = render(<Provider root={scope} />);

    expect(domOrderFor('p-', result.container)).toEqual([
      'static1',
      'static2',
      'static3',
      'static4',
      'dynamic1',
      'dynamic2',
      'dynamic3',
      'dynamic4',
    ]);
  });

  it('should allow passing independent order for providers', () => {
    const plugin1 = createPlugin('plugin1')
      .order(Infinity)
      .provider(mockProvider('p-dynamic1-5'), {enabled: () => true, order: -5})
      .provider(mockProvider('p-static1-5'), {order: -5})
      .provider(mockProvider('p-dynamic2'), {enabled: () => true})
      .provider(mockProvider('p-static2'))
      .init();
    const plugin2 = createPlugin('plugin2')
      .order(-Infinity)
      .provider(mockProvider('p-dynamic3'), {enabled: () => true})
      .provider(mockProvider('p-static3+5'), {order: 5})
      .provider(mockProvider('p-dynamic4'), {enabled: () => true})
      .provider(mockProvider('p-static4'))
      .provider(mockProvider('p-static5-6'), {order: -6})
      .init();
    const [Provider, {initialize}] = new PluginResolver().register(plugin1).register(plugin2).resolve();
    const scope = initialize();
    const result = render(<Provider root={scope} />);

    expect(domOrderFor('p-', result.container)).toEqual([
      'static5-6',
      'static1-5',
      'static4',
      'static2',
      'static3+5',
      'dynamic1-5',
      'dynamic3',
      'dynamic4',
      'dynamic2',
    ]);
  });

  it('should apply route providers to the route', () => {
    const plugin1 = createPlugin('plugin1')
      .provider(mockProvider('p-1'), {route: route => /^\/prefix/.test(route.path), enabled: () => true})
      .provider(mockProvider('p-2'), {route: route => /^\/prefix\/another/.test(route.path)})
      .provider(mockProvider('p-3'), {route: route => /^\/prefix/.test(route.path)})
      .route('/prefix/something', r('something'))
      .init();
    const plugin2 = createPlugin('plugin1')
      .route('/prefix/another', r('another'))
      .route('/prefix/xyz', r('xyz'))
      .route('/none', r('none'))
      .init();
    const [Provider, {initialize, routes}] = new PluginResolver().register(plugin1).register(plugin2).resolve();
    const scope = initialize();
    const resultBare = render(<Provider root={scope} />);
    const resultSomething = render(
      <Provider root={scope}>{routes.find(x => x.path === '/prefix/something')!.element}</Provider>
    );
    const resultAnother = render(
      <Provider root={scope}>{routes.find(x => x.path === '/prefix/another')!.element}</Provider>
    );
    const resultXyz = render(<Provider root={scope}>{routes.find(x => x.path === '/prefix/xyz')!.element}</Provider>);
    const resultNone = render(<Provider root={scope}>{routes.find(x => x.path === '/none')!.element}</Provider>);

    expect(domOrderFor('', resultBare.container)).toEqual([]);
    expect(domOrderFor('', resultSomething.container)).toEqual(['p-3', 'p-1', 'route-something']);
    expect(domOrderFor('', resultAnother.container)).toEqual(['p-2', 'p-3', 'p-1', 'route-another']);
    expect(domOrderFor('', resultXyz.container)).toEqual(['p-3', 'p-1', 'route-xyz']);
    expect(domOrderFor('', resultNone.container)).toEqual(['route-none']);
  });

  it('should apply route providers to the route (layout())', () => {
    const plugin1 = createPlugin('plugin1')
      .layout('/prefix/*', mockProvider('p-1'), {enabled: () => true})
      .layout('/prefix/another', mockProvider('p-2'))
      .layout('/prefix/*', mockProvider('p-3'))
      .route('/prefix/something', r('something'))
      .init();
    const plugin2 = createPlugin('plugin1')
      .route('/prefix/another', r('another'))
      .route('/prefix/xyz', r('xyz'))
      .route('/none', r('none'))
      .init();
    const [Provider, {initialize, routes}] = new PluginResolver().register(plugin1).register(plugin2).resolve();
    const scope = initialize();
    const resultBare = render(<Provider root={scope} />);
    const resultSomething = render(
      <Provider root={scope}>{routes.find(x => x.path === '/prefix/something')!.element}</Provider>
    );
    const resultAnother = render(
      <Provider root={scope}>{routes.find(x => x.path === '/prefix/another')!.element}</Provider>
    );
    const resultXyz = render(<Provider root={scope}>{routes.find(x => x.path === '/prefix/xyz')!.element}</Provider>);
    const resultNone = render(<Provider root={scope}>{routes.find(x => x.path === '/none')!.element}</Provider>);

    expect(domOrderFor('', resultBare.container)).toEqual([]);
    expect(domOrderFor('', resultSomething.container)).toEqual(['p-3', 'p-1', 'route-something']);
    expect(domOrderFor('', resultAnother.container)).toEqual(['p-2', 'p-3', 'p-1', 'route-another']);
    expect(domOrderFor('', resultXyz.container)).toEqual(['p-3', 'p-1', 'route-xyz']);
    expect(domOrderFor('', resultNone.container)).toEqual(['route-none']);
  });

  it('should allow reading the scope in the provider definition', () => {
    const Context = createContext<any>(null);
    const Reader: FC = () => <div data-testid={useContext(Context)} />;
    const plugin = createPlugin('plugin')
      .data({value: 'some1'})
      .provider(tk => <Context.Provider value={tk.data.value} />)
      .init();
    const [Provider, {initialize}] = new PluginResolver().register(plugin).resolve();
    const scope = initialize();
    const result = render(
      <Provider root={scope}>
        <Reader />
      </Provider>
    );

    expect(result.queryByTestId('some1')).toBeTruthy();
  });

  it('should throw error when there is missing configuration', () => {
    const plugin = createPlugin('a').define(config()('abc')).define(config()('def')).init();
    expect(() => {
      new PluginResolver().register(plugin).resolve();
    }).toThrow(`The "a" plugin is missing configuration: abc, def`);
  });

  it('should not throw error when there is missing optional configuration', () => {
    const plugin = createPlugin('a').define(config()('abc', 'default')).define(config()('def', 'another')).init();
    expect(() => {
      new PluginResolver().register(plugin).resolve();
    }).not.toThrow();
  });
});
