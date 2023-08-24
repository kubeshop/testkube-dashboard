import {RefObject} from 'react';
import {useIntersection} from 'react-use';

export function useInViewport(ref: RefObject<any>) {
  const entry = useIntersection(ref, {});
  return Boolean(entry?.isIntersecting);
}
