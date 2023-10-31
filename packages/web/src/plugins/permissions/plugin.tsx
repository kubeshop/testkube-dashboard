import {config, createPlugin, data} from '@testkube/plugins';

import {PermissionsProvider, PermissionsResolver} from '@permissions/base';

export default createPlugin('oss/permissions')
  .define(config<PermissionsResolver<any, any>>()('resolver'))
  .define(data<PermissionsResolver<any, any>>()('permissionsResolver'))

  .define(config<Record<string, any>>()('initialScope', {}))
  .define(data<Record<string, any>>()('permissionsScope'))
  .define(data<(scope: Record<string, any>) => void>()('setPermissionsScope'))

  .provider(tk => <PermissionsProvider resolver={tk.data.permissionsResolver} />)

  .init((tk, cfg) => {
    tk.data.permissionsScope = cfg.initialScope;
    tk.data.permissionsResolver = cfg.resolver;
    tk.data.setPermissionsScope = scope => {
      tk.data.permissionsScope = scope;
    };
  });
