import type {PluginEntry} from '@testkube/plugins';

import ClusterStatusPlugin from '@plugins/cluster-status/plugin';
import ClusterPlugin from '@plugins/cluster/plugin';
import ExecutorsPlugin from '@plugins/executors/plugin';
import GeneralPlugin from '@plugins/general/plugin';
import LabelsPlugin from '@plugins/labels/plugin';
import TelemetryPlugin from '@plugins/telemetry/plugin';
import TestSourcesPlugin from '@plugins/test-sources/plugin';
import TestsAndTestSuitesPlugin from '@plugins/tests-and-test-suites/plugin';
import TriggersPlugin from '@plugins/triggers/plugin';
import WebhooksPlugin from '@plugins/webhooks/plugin';

export const basePlugins: PluginEntry<any>[] = [
  ClusterStatusPlugin,
  TelemetryPlugin,
  GeneralPlugin,
  ClusterPlugin,
  ExecutorsPlugin,
  WebhooksPlugin,
  TriggersPlugin,
  TestSourcesPlugin,
  TestsAndTestSuitesPlugin,
  LabelsPlugin,
];
