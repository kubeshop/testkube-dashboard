export const PluginInit = Symbol('initialize plugin');
export const PluginDetails = Symbol('plugin configuration');

export const PluginScopeRootScope = Symbol('root scope in PluginScope');
export const PluginScopeSlotData = Symbol('slots data in PluginScope');
export const PluginScopeSyncData = Symbol('cached synchronization data in PluginScope');
export const PluginScopeCallSync = Symbol('update synchronized data in PluginScope');
