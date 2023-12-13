import {Children, FC, PropsWithChildren, ReactNode, createElement, useMemo} from 'react';

import {SearchResult} from '@store/logOutput';

import {Keyword} from './Console.styled';

export interface HighlightProps {
  highlights?: SearchResult[];
  HighlightComponent?: FC<PropsWithChildren<{className?: string}>> | string;
  DefaultComponent?: FC<PropsWithChildren<{}>> | string;
}

// TODO: Optimize
export const Highlight: FC<PropsWithChildren<HighlightProps>> = ({
  highlights,
  children,
  HighlightComponent = Keyword,
  DefaultComponent = 'span',
}) => {
  const {text, props} = useMemo(() => {
    const propsMap: Record<number, any> = {};
    let rawText = '';

    // Parse text to props
    // It takes an assumption that:
    // - children are text or <span> without nesting
    // - there are no overlapping highlights
    Children.map(children, element => {
      if (typeof element === 'string' || typeof element === 'number') {
        rawText += element;
      } else if (element && typeof element === 'object' && 'props' in element) {
        const start = rawText.length;
        const elementText = element.props.children;
        for (let i = start; i < start + elementText.length; i += 1) {
          propsMap[i] = element.props;
        }
        rawText += elementText;
      }
    });

    return {text: rawText, props: propsMap};
  }, [children]);

  const highlightsMap = useMemo(() => {
    if (!highlights?.length) {
      return {};
    }
    // Build map of highlights
    const map: Record<number, boolean> = {};
    for (let i = 0; i < highlights.length; i += 1) {
      const start = highlights[i].start;
      for (let j = start; j < highlights[i].end; j += 1) {
        map[j] = true;
      }
    }
    return map;
  }, [highlights]);

  return useMemo(() => {
    if (!highlights?.length) {
      return <DefaultComponent>{children}</DefaultComponent>;
    }

    // Wrap the text to elements again
    const nextElements: ReactNode[] = [];
    let lastIndex = 0;
    let lastProps: any;
    let lastHighlight = false;
    for (let i = 0; i < text.length; i += 1) {
      if (Boolean(highlightsMap[i]) !== lastHighlight || lastProps !== props[i]) {
        if (i !== lastIndex) {
          nextElements.push(
            createElement(
              lastHighlight ? Keyword : 'span',
              {...(lastProps || {}), key: nextElements.length},
              text.substring(lastIndex, i)
            )
          );
        }
        lastIndex = i;
        lastHighlight = Boolean(highlightsMap[i]);
        lastProps = props[i];
      }
    }

    // FIXME Conditionally?
    nextElements.push(
      createElement(
        lastHighlight ? Keyword : 'span',
        {...(lastProps || {}), key: nextElements.length},
        text.substring(lastIndex)
      )
    );

    return <>{nextElements}</>;
  }, [highlightsMap, props, text]);
};
