import {ReactElement, ReactNode, createElement} from 'react';

class ProviderCompositor {
  public providers: {provider: (props: any) => ReactElement | null; props: unknown}[] = [];

  public append<T>(provider: (props: T) => ReactElement | null, props: Omit<T, 'children'>): this {
    this.providers.push({provider, props});
    return this;
  }

  public render(children: ReactNode): ReactElement | null {
    let current = children as ReactElement | null;
    for (let i = this.providers.length - 1; i >= 0; i -= 1) {
      current = createElement(this.providers[i].provider, this.providers[i].props, current);
    }
    return current;
  }
}

export function composeProviders(): ProviderCompositor {
  return new ProviderCompositor();
}
