import {intersectionObserver} from '@shopify/jest-dom-mocks';
import {act, render} from '@testing-library/react';

import {ScrollTrigger} from '@atoms';

describe('atoms', () => {
  describe('ScrollTrigger', () => {
    beforeEach(() => intersectionObserver.mock());
    afterEach(() => intersectionObserver.restore());

    describe('Intersection', () => {
      it('should attach IntersectionObserver for the ScrollTrigger', () => {
        const result = render(<ScrollTrigger onScroll={jest.fn()} />);
        expect(intersectionObserver.observers.length).toBe(1);
        expect(intersectionObserver.observers[0].target).toBe(result.container.firstChild);
      });

      it('should emit event when the ScrollTrigger is in viewport', () => {
        const onScroll = jest.fn();
        const result = render(<ScrollTrigger onScroll={onScroll} />);

        act(() => {
          intersectionObserver.simulate({isIntersecting: true});
        });

        expect(onScroll).toHaveBeenCalledTimes(1);
      });

      it('should not emit event when the ScrollTrigger is in viewport but it is disabled', () => {
        const onScroll = jest.fn();
        const result = render(<ScrollTrigger disabled onScroll={onScroll} />);

        act(() => intersectionObserver.simulate({isIntersecting: true}));

        expect(onScroll).toHaveBeenCalledTimes(0);
      });

      it('should not emit event immediately after the ScrollTrigger is enabled', () => {
        const onScroll = jest.fn();
        const result = render(<ScrollTrigger disabled onScroll={onScroll} />);

        act(() => {
          intersectionObserver.simulate({isIntersecting: true});
          result.rerender(<ScrollTrigger onScroll={onScroll} />);
        });

        expect(onScroll).toHaveBeenCalledTimes(0);
      });
    });

    describe('Offset', () => {
      it('should be positioned in the exact place by default', () => {
        const result = render(<ScrollTrigger onScroll={jest.fn()} />);
        expect(result.container.firstChild).toHaveStyle('top: 0px;');
      });

      it('should allow to be positioned above', () => {
        const result = render(<ScrollTrigger offset={123} onScroll={jest.fn()} />);
        expect(result.container.firstChild).toHaveStyle('top: -123px;');
      });
    });
  });
});
