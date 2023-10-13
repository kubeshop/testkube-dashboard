export const PluginInit = Symbol('initialize plugin');
export const PluginDetails = Symbol('plugin configuration');

export const PluginScopeParentScope = Symbol('parent scope in PluginScope');
export const PluginScopeData = Symbol('internal data in PluginScope');
export const PluginScopeSlotData = Symbol('slots data in PluginScope');
export const PluginScopeSyncData = Symbol('cached synchronization data in PluginScope');
export const PluginScopeCallSync = Symbol('update synchronized data in PluginScope');
export const PluginScopeChildrenScope = Symbol('children scope in PluginScope');
export const PluginScopeDisableNewSync = Symbol('disable adding new watchers in PluginScope');
export const PluginScopeDisableNewSyncStatus = Symbol('status of adding new watchers in PluginScope');
export const PluginScopeProducer = Symbol('identity of the producer in the PluginScope');
export const PluginScopeProducerDataCache = Symbol('map of raw PluginSlot items to the specific producers');
export const PluginScopeProducerCache = Symbol('map of PluginSlot instances for the specific producers');
export const PluginScopeAttachProducer = Symbol('attach the producer to the PluginScope resource');
export const PluginScopeDestroy = Symbol('destroy the state produced through PluginScope');
