import {FC, PropsWithChildren, useLayoutEffect, useRef} from 'react';
import {useEvent, useUpdate} from 'react-use';

import {isEqual} from 'lodash';

import {useLastCallback} from '@hooks/useLastCallback';

import * as S from './Console.styled';

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

export const ConsoleLineMonitor: FC<ConsoleLineTemplateProps> = ({Component, maxDigits, wrap, onChange}) => {
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
      element.textContent = '\n'.repeat(linesCount - 1);
      lineHeight.current = placeholder.getBoundingClientRect().height / linesCount;
    });
  }, [height, linesCount]);

  useLayoutEffect(() => {
    use((placeholder, element) => {
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
      <S.HeightMonitor>
        <S.Monitor ref={heightFrameRef} />
      </S.HeightMonitor>
      <S.WidthMonitor>
        <S.Monitor ref={widthFrameRef} />
      </S.WidthMonitor>
      <S.PlaceholderContainer ref={containerRef}>
        <Component number={1} maxDigits={maxDigits}>
          dummy
        </Component>
      </S.PlaceholderContainer>
    </>
  );
};
