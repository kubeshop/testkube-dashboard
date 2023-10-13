import GTM from 'react-gtm-module';

import {mapValues} from 'lodash';

export type DataLayerValue = string | number | null | undefined;
export type DataLayerObject = Record<string, DataLayerValue>;

export interface TelemetryServiceApp {
  name: string;
  version: string;
}

export interface TelemetryServiceOptions {
  prefix?: string;
  gtmId?: string;
  disabled?: boolean;
  paused?: boolean;
  debug?: boolean;
  dataLayerName?: string;
  userDataStorageKey?: string;
  app: TelemetryServiceApp;
}

export class TelemetryService {
  private readonly prefix: string;
  private readonly gtmId?: string;
  private readonly dataLayerName: string;
  private readonly app: TelemetryServiceApp;
  private readonly userDataStorageKey?: string;
  private enabled = false;
  private paused = false;
  private debug = false;
  private initialized = false;
  private userData: DataLayerObject = {};
  private statusListeners = new Set<() => void>();

  public constructor(options: TelemetryServiceOptions) {
    this.prefix = options.prefix || '';
    this.gtmId = options.gtmId;
    this.dataLayerName = options.dataLayerName || 'dataLayer';
    this.app = options.app;
    this.debug = Boolean(options.debug);
    this.ensureAppMetaTags();
    // @ts-ignore: ensure dummy dataLayer is there.
    if (!window[this.dataLayerName]) {
      // @ts-ignore:
      window[this.dataLayerName] = [];
    }
    if (options.paused === true) {
      this.pause();
    }
    if (options.disabled) {
      this.disable();
    } else {
      this.enable();
    }
    if (options.userDataStorageKey) {
      this.userDataStorageKey = options.userDataStorageKey;
      try {
        this.userData = JSON.parse(localStorage.getItem(options.userDataStorageKey) || '{}');
        this.logDev('Recovered user data', {...this.userData});
      } catch (e) {
        // ignore errors, as telemetry shouldn't block the application
      }
    }
  }

  public ensureAppMetaTags() {
    let name = document.querySelector<HTMLMetaElement>('meta[name="app-name"]');
    let version = document.querySelector<HTMLMetaElement>('meta[name="app-version"]');
    if (!name) {
      name = document.createElement('meta');
      name.name = 'app-name';
      document.head.appendChild(name);
    }
    if (!version) {
      version = document.createElement('meta');
      version.name = 'app-version';
      document.head.appendChild(version);
    }
    name.content = this.app.name;
    version.content = this.app.version;
  }

  public get configured(): boolean {
    return Boolean(this.gtmId);
  }

  public get disabled(): boolean {
    return !this.configured || !this.enabled || this.paused;
  }

  /**
   * Pause sending events,
   * when we know that in this period events should be omitted.
   *
   * Example: cluster has or may have disabled telemetry.
   */
  public pause(): void {
    if (!this.paused) {
      this.paused = true;
      this.dataLayer({event: `${this.prefix}pause`});
    }
  }

  public resume(): void {
    if (this.paused) {
      this.paused = false;
      this.dataLayer({event: `${this.prefix}resume`});
    }
  }

  /**
   * Avoid running any integration and destroy existing,
   * as the User has disabled the tracking,
   * or the front-end wants to disable it (i.e. for development).
   *
   * When the service will be enabled later,
   * the missing events will be sent (besides these from paused period).
   */
  public disable(): void {
    if (this.enabled) {
      this.event('trackingDisabled');
    }
    this.enabled = false;
  }

  public enable(): void {
    if (!this.enabled) {
      this.enabled = true;
      this.initializeGtm();
    }
  }

  public set(userData?: DataLayerObject): void {
    // Show debugging information for the event in development
    this.validateDevRestrictedProperties(userData, ['event']);
    this.validateDevProperties(userData);
    this.groupDev('Data Set', () => {
      if (this.paused) {
        this.logDev('Ignored:', {...userData});
      } else {
        this.setUserData({...this.userData, ...userData});
        this.logDev('Appended:', {...userData});
        this.dataLayer({...this.userData, event: `${this.prefix}set`});
      }
    });
  }

  public reset(): void {
    this.groupDev('Data Reset', () => {
      const emptiedUserData = mapValues(this.userData, () => undefined);
      this.logDev('Previously:', {...this.userData});
      this.setUserData({});
      this.dataLayer({...emptiedUserData, event: `${this.prefix}set`});
      this.dataLayer({...this.userData, event: `${this.prefix}reset`});
    });
  }

  public pageView(pagePath: string): void {
    this.groupDev(`Page View: ${pagePath}`, () => {
      if (this.paused) {
        this.logDev('Ignored:', {event: 'page_view', eventModel: {page_path: pagePath}});
      } else {
        this.dataLayer({event: 'page_view', eventModel: {page_path: pagePath}});
      }
    });
  }

  /**
   * Send custom events to GTM.
   *
   * It provides additional information for development.
   */
  public event(event: string, data?: DataLayerObject): void {
    // Use prefix for the event
    event = `${this.prefix}${event}`;

    // Build message
    const timestampMs = new Date().getTime();
    const message = {
      ...this.userData,
      event,
      eventModel: {timestamp: Math.floor(timestampMs), timestampMs, ...data},
    };

    // Show debugging information for the event in development
    this.groupDev(`Event: ${event}`, () => {
      this.logDev('Data:', {...data});
      this.validateDevRestrictedProperties(data, ['event']);
      this.validateDevProperties(data);

      // Send the event
      if (this.paused) {
        this.logDev('Ignored:', message);
      } else {
        this.dataLayer(message);
      }
    });
  }

  public onStatusChange(fn: () => void): () => void {
    const wrappedListener = () => fn();
    this.statusListeners.add(wrappedListener);
    return () => this.statusListeners.delete(wrappedListener);
  }

  private emitStatusChange(): void {
    this.statusListeners.forEach(listener => listener());
  }

  private setUserData(data: DataLayerObject): void {
    this.userData = data;
    if (this.userDataStorageKey) {
      try {
        localStorage.setItem(this.userDataStorageKey, JSON.stringify(data));
      } catch (e) {
        // ignore errors, as telemetry shouldn't block the application
      }
    }
  }

  // eslint-disable-next-line no-dupe-class-members
  private dataLayer(dataLayer: object): void;
  // eslint-disable-next-line no-dupe-class-members
  private dataLayer(arg1: string, arg2: string, ...args: any): void;
  // eslint-disable-next-line no-dupe-class-members
  private dataLayer(): void {
    // GTM allows arguments object in the data layer, but doesn't use array.
    // eslint-disable-next-line prefer-rest-params
    const dataLayer = arguments.length > 1 ? arguments : arguments[0];
    this.logDev('DataLayer:', dataLayer);
    GTM.dataLayer({dataLayer, dataLayerName: this.dataLayerName});
  }

  // eslint-disable-next-line class-methods-use-this
  private groupDev(name: string, fn: () => void): void {
    if (!this.debug) {
      fn();
      return;
    }
    const tags = [
      this.disabled ? 'NOT SENT' : 'SENT',
      this.paused ? 'PAUSED' : 'ACCEPTED',
      this.enabled ? 'ENABLED' : 'DISABLED',
      this.gtmId || 'GTM-???????',
    ];
    // eslint-disable-next-line no-console
    console.group(`%cTelemetry: ${name}   [${tags.filter(Boolean).join(' / ')}]`, 'color: gray; font-weight: bold');
    fn();
    // eslint-disable-next-line no-console
    console.groupEnd();
  }

  private validateDevRestrictedProperties(data: Record<string, any> | undefined, restricted: string[]): void {
    if (!this.debug) {
      return;
    }
    const keys = Object.keys(data || {});
    const invalid = keys.filter(key => restricted.includes(key));
    if (invalid.length > 0) {
      // eslint-disable-next-line no-console
      console.error('  ', `The event should not have [${restricted.join(', ')}] properties. Received:`, invalid);
    }
  }

  private validateDevProperties(data?: Record<string, any>): void {
    if (!this.debug) {
      return;
    }
    const invalid = Object.entries(data || {})
      .filter(
        ([, value]) =>
          typeof value !== 'string' &&
          (typeof value !== 'number' || Number.isNaN(value)) &&
          typeof value !== 'undefined' &&
          value !== null
      )
      .map(([key]) => key);
    if (invalid.length > 0) {
      // eslint-disable-next-line no-console
      console.error(
        '  ',
        'The event should have only "string", "number" or empty properties. Invalid values received in:',
        invalid
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private logDev(...args: any): void {
    if (!this.debug) {
      return;
    }
    // eslint-disable-next-line no-console
    console.log('%cTelemetry:', 'color: gray; font-weight: bold', ...args);
  }

  private initializeGtm(): void {
    if (!this.gtmId) {
      return;
    }
    if (this.initialized) {
      this.event('trackingEnabled');
    } else {
      this.initialized = true;
      this.logDev('Initialized GTM');

      // Initialize GTM
      GTM.initialize({
        gtmId: this.gtmId,
        dataLayerName: this.dataLayerName,
        dataLayer: {
          ...this.userData,
          event: `${this.prefix}initialized`,
          appName: this.app.name,
          appVersion: this.app.version,
        },
      });
    }
  }
}
