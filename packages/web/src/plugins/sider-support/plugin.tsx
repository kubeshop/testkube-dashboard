import {QuestionCircleOutlined} from '@ant-design/icons';
import {Popover} from 'antd';

import {createPlugin, external} from '@testkube/plugins';

import ExternalLink from '@atoms/ExternalLink';

import Text from '@custom-antd/Typography/Text';

import {DropdownListItem} from '@organisms/Sider/Sider.styled';

import type ConfigPlugin from '@plugins/config/plugin';
import type GeneralPlugin from '@plugins/general/plugin';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';

const generalStub = external<typeof GeneralPlugin>();
const configStub = external<typeof ConfigPlugin>();

export default createPlugin('dashboard/sider-support')
  .needs(generalStub.slots('siderOtherItems'))
  .needs(configStub.data('discordUrl'))

  .init(tk => {
    tk.slots.siderOtherItems.add({
      icon: 'documentation',
      dropdownComponent: (
        <Popover
          align={{offset: [0, 13]}}
          placement="rightBottom"
          content={
            <>
              <DropdownListItem>
                <ExternalLink href={externalLinks.documentation}>
                  <Text color={Colors.slate300} className="regular middle">
                    Documentation
                  </Text>
                </ExternalLink>
              </DropdownListItem>
              <DropdownListItem>
                <ExternalLink href={tk.data.discordUrl}>
                  <Text color={Colors.slate300} className="regular middle">
                    Discord community
                  </Text>
                </ExternalLink>
              </DropdownListItem>
              <DropdownListItem>
                <ExternalLink href={externalLinks.github}>
                  <Text color={Colors.slate300} className="regular middle">
                    GitHub
                  </Text>
                </ExternalLink>
              </DropdownListItem>
            </>
          }
          trigger={['hover']}
        >
          <QuestionCircleOutlined style={{fontSize: 20}} />
        </Popover>
      ),
    });
  });
