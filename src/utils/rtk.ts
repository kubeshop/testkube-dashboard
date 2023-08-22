type IdTokenResolver = () => Promise<string | null>;
let resolveIdToken: IdTokenResolver = () => Promise.resolve(null);

type BaseUrlResolver = (routeToRequest: string | undefined) => string;
let resolveBaseUrl: BaseUrlResolver = () => '';
export const setRtkIdTokenResolver = (resolver: IdTokenResolver): void => {
  resolveIdToken = resolver;
};
export const setRtkBaseUrlResolver = (resolver: BaseUrlResolver): void => {
  resolveBaseUrl = resolver;
};

// TODO: Delete these when not needed.
//       It's temporarily used to unify ID token and base url strategy.
export const getRtkBaseUrl = (routeToRequest: string | undefined): string => {
  return resolveBaseUrl(routeToRequest) || '';
};
export const getRtkIdToken = (): Promise<string | null> => {
  return resolveIdToken();
};
