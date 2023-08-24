import {FC} from 'react';

import {Arguments} from './CommandAndArguments/Arguments';
import {Command} from './CommandAndArguments/Command';

export const CommandAndArguments: FC = () => (
  <>
    <Command />
    <Arguments />
  </>
);
