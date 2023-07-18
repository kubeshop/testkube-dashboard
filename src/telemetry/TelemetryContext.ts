import {createContext} from 'react';

import {TelemetryService} from './TelemetryService';

export const TelemetryContext = createContext<{telemetry?: TelemetryService}>({});
