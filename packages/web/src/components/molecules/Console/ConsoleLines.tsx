import {FC, memo} from 'react';

import {ConsoleProps} from './Console';
import {ConsoleLine} from './ConsoleLine';
import {LogProcessorLine} from './LogProcessorLine';

export const ConsoleLines: FC<{
  lines: LogProcessorLine[];
  start: number;
  maxDigits: number;
  LineComponent: ConsoleProps['LineComponent'];
  onSelectLine?: (line: number) => void;
  selectedLine?: number;
}> = memo(({lines, start, maxDigits, LineComponent = ConsoleLine, onSelectLine, selectedLine}) => (
  <>
    {lines.map((line, lineIndex) => (
      <LineComponent
        // eslint-disable-next-line react/no-array-index-key
        key={start + lineIndex}
        number={start + lineIndex + 1}
        maxDigits={maxDigits}
        onSelectLine={() => {
          if (onSelectLine) {
            onSelectLine(start + lineIndex + 1);
          }
        }}
        selectedLine={selectedLine}
      >
        {line.nodes}
      </LineComponent>
    ))}
  </>
));
