import {PluginOverlayContext} from './symbols';
import {PluginProvider} from './types';

export class PluginOverlay {
  private [PluginOverlayContext]: Record<string, any> = {};
  private providerCreator: (() => PluginProvider<any>) | null = null;

  public getContext() {
    return this[PluginOverlayContext];
  }

  public setContext(context: Record<string, any> | ((oldContext: Record<string, any>) => Record<string, any>)) {
    if (typeof context === 'function') {
      this[PluginOverlayContext] = context(this[PluginOverlayContext]);
      return;
    }
    this[PluginOverlayContext] = context;
  }

  public appendContext(context: Record<string, any>) {
    this[PluginOverlayContext] = {...this[PluginOverlayContext], ...context};
  }

  public useProvider() {
    if (!this.providerCreator) return null;
    return this.providerCreator();
  }

  public provider(pc: typeof this.providerCreator) {
    this.providerCreator = pc;
  }
}
