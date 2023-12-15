import {FC, memo} from 'react';

import {ConsoleProps} from './Console';
import {ConsoleLine} from './ConsoleLine';
import {LogProcessorLine} from './LogProcessorLine';

export const ConsoleLines: FC<{
  lines: LogProcessorLine[];
  start: number;
  maxDigits: number;
  LineComponent: ConsoleProps['LineComponent'];
}> = memo(({lines, start, maxDigits, LineComponent = ConsoleLine}) => (
  <>
    {lines.map((line, lineIndex) => (
      // eslint-disable-next-line react/no-array-index-key
      <LineComponent key={start + lineIndex} number={start + lineIndex + 1} maxDigits={maxDigits}>
        {line.nodes}
      </LineComponent>
    ))}
  </>
));
