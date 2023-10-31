import {QuestionCircleOutlined} from '@ant-design/icons';
import {Popover} from 'antd';

import {createPlugin, external} from '@testkube/plugins';

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
                <a href={externalLinks.documentation} target="_blank">
                  <Text color={Colors.slate300} className="regular middle">
                    Documentation
                  </Text>
                </a>
              </DropdownListItem>
              <DropdownListItem>
                <a href={tk.data.discordUrl} target="_blank">
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
  });
