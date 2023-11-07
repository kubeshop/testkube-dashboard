/**
 * The original usePrompt of react-router-dom requires to use Data Router.
 * We are using the dynamic <Routes> instead, so it's not supported.
 *
 * To overcome that, this implementation is working well for our router.
 */
import {useContext, useEffect, useMemo, useRef} from 'react';
import {UNSAFE_NavigationContext as NavigationContext, Navigator} from 'react-router-dom';
import {usePrevious, useUnmount} from 'react-use';

import {useLastCallback} from '@hooks/useLastCallback';

type BlockerCondition = () => boolean | undefined;

interface NavigatorWithBlockers extends Navigator {
  $block: (message: string, when: BlockerCondition) => () => void;
}

const applyNavigatorBlockers = (navigator: Navigator): NavigatorWithBlockers => {
  if ('$block' in navigator) {
    return navigator as NavigatorWithBlockers;
  }

  const blockers: {message: string; when: BlockerCondition}[] = [];
  const originalGo = navigator.go;
  const originalPush = navigator.push;
  const originalReplace = navigator.replace;

  const block =
    <T extends (...args: any) => void>(func: T) =>
    (...args: Parameters<T>) => {
      const blocker = blockers.find(x => x.when());
      // eslint-disable-next-line no-restricted-globals, no-alert
      if (!blocker || confirm(blocker.message)) {
        return func.apply(navigator, args);
      }
    };

  return Object.assign(navigator, {
    go: block(originalGo),
    push: block(originalPush),
    replace: block(originalReplace),
    $block: (message: string, when: BlockerCondition) => {
      const item = {message, when};
      blockers.push(item);
      return () => {
        const index = blockers.indexOf(item);
        if (index !== -1) {
          blockers.splice(index, 1);
        }
      };
    },
  });
};

export const usePrompt = (message: string, when: BlockerCondition = () => false) => {
  const {navigator} = useContext(NavigationContext);
  const enhancedNavigator = useMemo(() => applyNavigatorBlockers(navigator), [navigator]);
  const rule = useLastCallback(when);

  const unsubscribe = useRef(() => {});
  const prevMessage = usePrevious(message);

  useEffect(() => {
    const listener = (event: BeforeUnloadEvent) => {
      if (rule()) {
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };
    window.addEventListener('beforeunload', listener);
    return () => window.removeEventListener('beforeunload', listener);
  }, [message]);

  if (prevMessage !== message) {
    unsubscribe.current();
    unsubscribe.current = enhancedNavigator.$block(message, rule);
  }

  useUnmount(unsubscribe.current);
};
