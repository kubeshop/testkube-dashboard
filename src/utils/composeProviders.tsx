import {FC, ReactElement, createElement} from 'react';

class ProviderCompositor {
  public providers: {provider: FC<any>; props: unknown}[] = [];

  public append<T>(provider: FC<T>, props: Omit<T, 'children'>): this {
    this.providers.push({provider, props});
    return this;
  }

  public render(children: ReactElement): ReactElement {
    let current = children;
    for (let i = this.providers.length - 1; i >= 0; i -= 1) {
      current = createElement(this.providers[i].provider, this.providers[i].props, current);
    }
    return current;
  }
}

export function composeProviders(): ProviderCompositor {
  return new ProviderCompositor();
}
