import {config} from '@constants/config';

// Allow overriding the configuration temporarily,
// so E2E tests may be completed easily on any environment.
let overrides: Record<string, any> = JSON.parse(localStorage.getItem(config.overrides) || '{}');

export const areOverridesApplied = () => {
  return Object.keys(overrides).length > 0;
};

export const setOverrides = (newOverrides: Record<string, any>) => {
  overrides = newOverrides;
  localStorage.setItem(config.overrides, JSON.stringify(newOverrides));
};

export const resetOverrides = () => {
  setOverrides({});
};

// Create red line on top of the dashboard, to indicate overrides enabled
export const renderOverridesIndicator = () => {
  const element = document.querySelector('#overrides-indicator');
  if (areOverridesApplied()) {
    if (!element) {
      const newElement = document.createElement('div');
      newElement.id = 'overrides-indicator';
      newElement.style.position = 'absolute';
      newElement.style.top = '0px';
      newElement.style.left = '0px';
      newElement.style.width = '100%';
      newElement.style.height = '5px';
      newElement.style.zIndex = '4444444';
      newElement.style.background = 'red';
      newElement.style.cursor = 'pointer';
      newElement.addEventListener('click', () => {
        resetOverrides();
        window.location.reload();
      });
      document.body.appendChild(newElement);
    }
  } else {
    element?.parentNode?.removeChild(element);
  }
};

// URL with "?~" will reset overrides,
// URL with "?~<env>=<value>" pairs will update them
export const applyUrlOverrides = () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('~')) {
    resetOverrides();
  } else {
    const newOverrides: Record<string, any> = {};
    params.forEach((value, key) => {
      if (/^~/.test(key)) {
        // To simplify testing, setup simpler aliases,
        // ~REACT_APP_ENTERPRISE=true  ==  ~ENTERPRISE=true  ==  ~enterprise=true
        newOverrides[
          key
            .substring(1)
            .toUpperCase()
            .replace(/^(REACT_APP)?_*/, 'REACT_APP_')
        ] = value;
        params.delete(key);
      }
    });
    setOverrides({...overrides, ...newOverrides});

    // Delete the overrides from URL
    const newSearch = params.toString().replace(/^\?$/, '');
    if (newSearch !== window.location.search) {
      window.history.replaceState(null, '', window.location.pathname + newSearch);
    }
  }
};

export const getValue = <T>(name: string, value: T): T => {
  return name in overrides ? overrides[name] : value;
};
