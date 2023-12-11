import {FC, PropsWithChildren, useLayoutEffect, useRef} from 'react';
import {useEvent, useUpdate} from 'react-use';

import {isEqual} from 'lodash';
import styled, {css} from 'styled-components';

import {useLastCallback} from '@hooks/useLastCallback';

export interface ConsoleLineDimensions {
  maxCharacters: number;
  characterWidth: number;
  baseWidth: number;
  lineHeight: number;
}

export interface ConsoleLineTemplateProps {
  Component: FC<PropsWithChildren<{number: number; maxDigits: number}>>;
  maxDigits: number;
  wrap?: boolean;
  onChange: (dimensions: ConsoleLineDimensions) => void;
}

const hiddenCss = css`
  visibility: hidden;
  opacity: 0;
  user-select: none;
  pointer-events: none;
  overflow: hidden;
`;

const PlaceholderContainer = styled.div`
  display: none;
  ${hiddenCss}
`;

const Monitor = styled.iframe`
  border: 0;
  width: 100%;
  height: 100%;
`;

const HeightMonitor = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  ${hiddenCss}
`;

const WidthMonitor = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 0;
  ${hiddenCss}
`;

export const ConsoleLineTemplate: FC<ConsoleLineTemplateProps> = ({Component, maxDigits, wrap, onChange}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heightFrameRef = useRef<HTMLIFrameElement>(null);
  const widthFrameRef = useRef<HTMLIFrameElement>(null);
  const update = useLastCallback(useUpdate());

  const width = widthFrameRef.current?.clientWidth;
  const height = heightFrameRef.current?.clientHeight;

  const baseWidth = useRef<number>(0);
  const lineHeight = useRef<number>(1000);
  const characterWidth = useRef<number>(1000);
  const maxCharacters = useRef<number>(Infinity);

  const linesCount = 10 ** Math.max(maxDigits + 1, 3);

  const lastEmitted = useRef<ConsoleLineDimensions>();
  const emit = () => {
    const next = {
      baseWidth: baseWidth.current,
      lineHeight: lineHeight.current,
      characterWidth: characterWidth.current,
      maxCharacters: wrap ? maxCharacters.current : Infinity,
    };
    if (!isEqual(lastEmitted.current, next)) {
      lastEmitted.current = next;
      onChange(next);
    }
  };
  const use = (fn: (container: HTMLElement, element: HTMLElement) => void) => {
    const element = Array.from(containerRef.current?.children[0].querySelectorAll('*') || []).find(
      x => x.textContent === 'dummy'
    ) as HTMLElement;
    if (element && width && height) {
      containerRef.current!.style.display = 'block';
      fn(containerRef.current!, element);
      containerRef.current!.style.display = '';
      element.textContent = 'dummy';
      emit();
    }
  };

  useEvent('resize', update, widthFrameRef.current?.contentWindow);
  useEvent('resize', update, heightFrameRef.current?.contentWindow);

  useLayoutEffect(() => {
    use((placeholder, element) => {
      placeholder.style.width = 'min-content';
      baseWidth.current = placeholder.getBoundingClientRect().width;
      placeholder.style.width = '';
    });
  }, [width, maxDigits]);

  useLayoutEffect(() => {
    use((placeholder, element) => {
      // Compute line height
      element.textContent = '\n'.repeat(linesCount - 1);
      lineHeight.current = element.getBoundingClientRect().height / linesCount;
      placeholder.style.whiteSpace = '';
    });
  }, [height, linesCount]);

  useLayoutEffect(() => {
    use((placeholder, element) => {
      // Compute character width
      placeholder.style.whiteSpace = 'nowrap';
      element.textContent = '0'.repeat(2000);
      characterWidth.current = element.getBoundingClientRect().width / 2000;
      placeholder.style.whiteSpace = '';
    });
  }, [width, height, maxDigits]);

  useLayoutEffect(() => {
    if (!wrap) {
      maxCharacters.current = Infinity;
      emit();
      return;
    }
    use((placeholder, element) => {
      // Compute max characters
      const estimated = Math.floor((width! - baseWidth.current) / characterWidth.current) - 5;
      element.textContent = '0'.repeat(estimated - 1);
      for (let i = estimated; i < 1000; i += 1) {
        element.textContent += '0';
        if (Math.abs(placeholder.clientHeight - lineHeight.current) > 1) {
          maxCharacters.current = i - 1;
          break;
        }
      }
    });
  }, [width, wrap]);

  return (
    <>
      <HeightMonitor>
        <Monitor ref={heightFrameRef} />
      </HeightMonitor>
      <WidthMonitor>
        <Monitor ref={widthFrameRef} />
      </WidthMonitor>
      <PlaceholderContainer ref={containerRef}>
        <Component number={1} maxDigits={maxDigits}>
          dummy
        </Component>
      </PlaceholderContainer>
    </>
  );
};
