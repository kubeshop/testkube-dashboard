import {FC, PropsWithChildren, ReactElement, cloneElement, useMemo} from 'react';

import Anser, {AnserJsonEntry} from 'anser';
import {escapeCarriageReturn} from 'escape-carriage';
import styled from 'styled-components';

import {ConsoleLine} from './ConsoleLine';

interface ConsoleProps {
  content: string;
  start?: number;
  LineComponent?: FC<PropsWithChildren<{number: number; maxDigits: number}>>;
}

function createClass(bundle: AnserJsonEntry): string | undefined {
  let classNames: string = '';

  if (bundle.bg) {
    classNames += `${bundle.bg}-bg `;
  }
  if (bundle.fg) {
    classNames += `${bundle.fg}-fg `;
  }
  if (bundle.decoration) {
    classNames += `ansi-${bundle.decoration} `;
  }

  return classNames ? classNames.substring(0, classNames.length - 1) : undefined;
}

const ansiToLines = (input: string) => {
  const anser = new Anser();
  const options = {json: true, remove_empty: true, use_classes: true};
  const lines: ReactElement[][] = [];

  // Parse
  let line: ReactElement[] = [];
  let lastIndex = 0;
  let className: string | undefined;
  let isEscaping = false;
  const apply = (i: number) => {
    if (lastIndex === i) {
      return;
    }
    const content = input.substring(lastIndex, i);
    if (isEscaping) {
      const match = anser.processChunkJson(content, options, true);
      const newClassName = createClass(match);
      isEscaping = false;
      // Optimize for cases where consecutive characters have same color codes
      if (newClassName === className && match.content !== '' && line.length) {
        line[line.length - 1] = cloneElement(
          line[line.length - 1],
          {},
          line[line.length - 1].props.children + match.content
        );
      } else if (match.content !== '') {
        className = newClassName;
        line.push(
          <span key={line.length} className={className}>
            {match.content}
          </span>
        );
      }
    } else {
      line.push(
        <span key={line.length} className={className}>
          {content}
        </span>
      );
    }
    lastIndex = i;
  };
  for (let i = 0; i < input.length; i += 1) {
    if (input[i] === '\n') {
      apply(i + 1);
      lines.push(line);
      line = [];
    } else if (input.charCodeAt(i) === 0x1b && input[i + 1] === '[') {
      apply(i);
      isEscaping = true;
      i += 1;
      lastIndex = i + 1;
    }
  }

  apply(input.length);
  if (line.length > 0) {
    lines.push(line);
  }
  return lines;
};

export const ConsoleContainer = styled.code`
  display: block;
  width: min-content;
  min-width: 100%;
`;

// TODO: Optimize to process only newly added content
export const Console: FC<ConsoleProps> = ({start = 1, content, LineComponent = ConsoleLine}) => {
  const lines = useMemo(() => ansiToLines(escapeCarriageReturn(content)), [content]);
  const maxDigits = `${start + lines.length}`.length;
  return (
    <ConsoleContainer>
      {lines.map((line, lineIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <LineComponent key={lineIndex} number={start + lineIndex} maxDigits={maxDigits}>{line}</LineComponent>
      ))}
    </ConsoleContainer>
  );
};
