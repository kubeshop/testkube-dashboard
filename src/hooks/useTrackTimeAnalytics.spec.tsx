import {FC} from 'react';

import {act, fireEvent, render} from '@testing-library/react';

import {AnalyticsContext} from '@contexts';

import useTrackTimeAnalytics from './useTrackTimeAnalytics';

const setDocumentVisibility = (value: boolean) => {
  const hidden = !value;
  if (document.hidden === hidden) {
    return;
  }
  Object.defineProperty(document, 'hidden', { value: hidden, configurable: true });
  fireEvent(document, new CustomEvent('visibilitychange'));
};

describe('hooks', () => {
  describe('useTrackTimeAnalytics', () => {
    beforeEach(() => {
      setDocumentVisibility(true);
      jest.useFakeTimers();
    });

    afterEach(() => {
      setDocumentVisibility(true);
    });

    const TestComponent: FC<{name: string, condition?: boolean}> = ({name, condition}) => {
      useTrackTimeAnalytics(name, condition);
      return <div />;
    };

    it('should track milliseconds with 100ms precision (floor)', () => {
      const track = jest.fn();
      const result = render(
        <AnalyticsContext.Provider value={{ analyticsTrack: track }}>
          <TestComponent name='test-name' />
        </AnalyticsContext.Provider>
      );
      act(() => {
        jest.advanceTimersByTime(299);
      });
      result.unmount();
      expect(track).toBeCalledTimes(1);
      expect(track).toBeCalledWith('trackTime', {
        duration: 200,
        page: 'test-name',
      });
    });

    describe('Unmounting', () => {
      it('should not track after immediate unmount', async () => {
        const track = jest.fn();
        const result = render(
          <AnalyticsContext.Provider value={{ analyticsTrack: track }}>
            <TestComponent name='test-name' />
          </AnalyticsContext.Provider>
        );
        act(() => {
          jest.advanceTimersByTime(199);
        });
        result.unmount();
        expect(track).not.toBeCalled();
      });

      it('should track after minimum of 200ms', async () => {
        const track = jest.fn();
        const result = render(
          <AnalyticsContext.Provider value={{ analyticsTrack: track }}>
            <TestComponent name='test-name' />
          </AnalyticsContext.Provider>
        );
        act(() => {
          jest.advanceTimersByTime(200);
        });
        result.unmount();
        expect(track).toBeCalledTimes(1);
        expect(track).toBeCalledWith('trackTime', {
          duration: 200,
          page: 'test-name',
        });
      });
    });

    describe('Document visibility change', () => {
      it('should not track after immediate document hide', () => {
        const track = jest.fn();
        const result = render(
          <AnalyticsContext.Provider value={{ analyticsTrack: track }}>
            <TestComponent name='test-name' />
          </AnalyticsContext.Provider>
        );
        act(() => {
          jest.advanceTimersByTime(199);
          setDocumentVisibility(false);
        });
        expect(track).not.toBeCalled();
      });

      it('should track after document hide after minimum of 200ms', () => {
        const track = jest.fn();
        const result = render(
          <AnalyticsContext.Provider value={{ analyticsTrack: track }}>
            <TestComponent name='test-name' />
          </AnalyticsContext.Provider>
        );
        act(() => {
          jest.advanceTimersByTime(200);
        });
        act(() => {
          setDocumentVisibility(false);
        });
        expect(track).toBeCalledTimes(1);
        expect(track).toBeCalledWith('trackTime', {
          duration: 200,
          page: 'test-name',
        });
      });
    });

    describe('Falsy condition', () => {
      it('should not track after unmounting when the condition is falsy', () => {
        const track = jest.fn();
        const result = render(
          <AnalyticsContext.Provider value={{ analyticsTrack: track }}>
            <TestComponent name='test-name' condition={false} />
          </AnalyticsContext.Provider>
        );
        act(() => {
          jest.advanceTimersByTime(200);
        });
        result.unmount();
        expect(track).not.toBeCalled();
      });

      it('should not track after hiding the document when the condition is falsy', () => {
        const track = jest.fn();
        const result = render(
          <AnalyticsContext.Provider value={{ analyticsTrack: track }}>
            <TestComponent name='test-name' condition={false} />
          </AnalyticsContext.Provider>
        );
        act(() => {
          jest.advanceTimersByTime(200);
          setDocumentVisibility(false);
        });
        expect(track).not.toBeCalled();
      });
    });
  });
});
