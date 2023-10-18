import {QuestionCircleOutlined} from '@ant-design/icons';
import {Popover} from 'antd';

import {createPlugin, external} from '@testkube/plugins';

import Text from '@custom-antd/Typography/Text';

import {DropdownListItem} from '@organisms/Sider/Sider.styled';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';

import type LegacyPlugin from './legacy';

const legacyStub = external<typeof LegacyPlugin>();

export default createPlugin('web-legacy-oss-only')
  .needs(legacyStub.slots('siderOtherItems'))
  .needs(legacyStub.data('useDashboardNavigate'))

  // Finish
  .init(tk => {
    // TODO: Separate in specific plugins?
    tk.slots.siderOtherItems.add({
      icon: 'cog',
      title: 'Settings',
      onClick: tk.sync(() => tk.data.useDashboardNavigate('/settings')),
    });
    tk.slots.siderOtherItems.add({
      icon: 'documentation',
      dropdownComponent: (
        <Popover
          align={{offset: [0, 13]}}
          placement="rightBottom"
          content={
            <>
              <DropdownListItem>
                <a href={externalLinks.documentation} target="_blank">
                  <Text color={Colors.slate300} className="regular middle">
                    Documentation
                  </Text>
                </a>
              </DropdownListItem>
              <DropdownListItem>
                <a href={externalLinks.discord} target="_blank">
                  <Text color={Colors.slate300} className="regular middle">
                    Discord community
                  </Text>
                </a>
              </DropdownListItem>
              <DropdownListItem>
                <a href={externalLinks.github} target="_blank">
                  <Text color={Colors.slate300} className="regular middle">
                    GitHub
                  </Text>
                </a>
              </DropdownListItem>
            </>
          }
          trigger={['hover']}
        >
          <QuestionCircleOutlined style={{fontSize: 20}} />
        </Popover>
      ),
    });
    tk.slots.siderOtherItems.add({
      icon: 'cloudMigrate',
      title: 'Connect to Testkube Cloud',
      size: 32,
      onClick: () => window.open(externalLinks.OSStoCloudMigration),
    });
  });
