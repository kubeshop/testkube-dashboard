import {FC, memo} from 'react';

import {ConsoleProps} from './Console';
import {ConsoleLine} from './ConsoleLine';
import {LogProcessorLine} from './LogProcessorLine';

export const ConsoleLines: FC<{
  lines: LogProcessorLine[];
  start: number;
  maxDigits: number;
  LineComponent: ConsoleProps['LineComponent'];
  onLineClick?: (line: number) => void;
  selectedLine?: number;
}> = memo(({lines, start, maxDigits, LineComponent = ConsoleLine, onLineClick, selectedLine}) => (
  <>
    {lines.map((line, lineIndex) => (
      <LineComponent
        // eslint-disable-next-line react/no-array-index-key
        key={start + lineIndex}
        number={start + lineIndex + 1}
        maxDigits={maxDigits}
        onLineClick={() => {
          if (onLineClick) {
            onLineClick(start + lineIndex + 1);
          }
        }}
        selectedLine={selectedLine}
      >
        {line.nodes}
      </LineComponent>
    ))}
  </>
));
